import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Transport, MicroserviceOptions, RmqContext } from '@nestjs/microservices';
import { RefillingModule } from './refilling.module';
import * as amqp from 'amqplib';
import { RefillingController } from './refilling.controller';


async function bootstrap() {
  const app = await NestFactory.create(RefillingModule);

  const configService = app.get(ConfigService);

  const USER = configService.get('RABBITMQ_USER');
  const PASSWORD = configService.get('RABBITMQ_PASS');
  const HOST = configService.get('RABBITMQ_HOST');
  const QUEUE = configService.get('RABBITMQ_REFILLING_QUEUE');
  const refillingController = app.get(RefillingController)

  const consumerConfigs = [
    {
      exchange: 'topic_exchange',
      routingKeyPattern: 'event.type.#',
      methodToCall:refillingController.handleMessage
    },
    {
      exchange: 'topic_exchange2',
      routingKeyPattern: 'topic2.#',
      methodToCall:refillingController.handleMessageShip
    },
    // Add more consumer configurations as needed
  ];

  
  for (const consumerConfig of consumerConfigs) {
    const { exchange, routingKeyPattern, methodToCall} = consumerConfig;
    const connection = await amqp.connect(`amqp://${USER}:${PASSWORD}@${HOST}`);
    const channel = await connection.createChannel();
    await channel.assertExchange(exchange, 'topic', { durable: false });
    await channel.assertQueue(QUEUE, { durable: true });
    await channel.bindQueue(QUEUE, exchange, routingKeyPattern);

    console.log("Consumer listening on: "+exchange);
    await channel.consume(
            QUEUE,
            async (message) => {
              if (message !== null) {
                const content = message.content.toString();
                console.log('Consumer 1 received event:', content);
                // Process the event...
                const rmqContext = new RmqContext([message, channel, null]);
                await methodToCall.call(refillingController, content, rmqContext);
                //channel.ack(message); // Acknowledge the event
              }
            },
      );
  }


  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
      noAck:false,
      queue: QUEUE,
      queueOptions: {
        durable: true,
      },
    },
  });
 
  app.startAllMicroservices();
  //await app.listen(5673);
}

bootstrap();
