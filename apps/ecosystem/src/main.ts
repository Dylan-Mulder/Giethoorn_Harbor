import { EcosystemModule } from './ecosystem.module';
import { EcosystemService } from './ecosystem.service';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Transport, MicroserviceOptions, RmqContext } from '@nestjs/microservices';
import amqp from 'amqp-connection-manager';
import { EcosystemController } from './ecosystem.controller';


async function bootstrap() {
  const app = await NestFactory.create(EcosystemModule);

  const configService = app.get(ConfigService);

  const USER = configService.get('RABBITMQ_USER');
  const PASSWORD = configService.get('RABBITMQ_PASS');
  const HOST = configService.get('RABBITMQ_HOST');
  const QUEUE = configService.get('RABBITMQ_REFILLING_QUEUE');
  const ecosystemController = app.get(EcosystemController)

  const consumerConfigs = [
    {
      exchange: 'waterquality-inspected',
      routingKeyPattern: 'event.waterquality-inspected',
      methodToCall:ecosystemController.handleWaterQualityInspected
    },
    // {
    //   exchange: 'ship-has-docked',
    //   routingKeyPattern: 'event.ship-has-docked',
    //   methodToCall:refillingController.handleShipHasDocked
    // }
  ];

  
  for (const consumerConfig of consumerConfigs) {
    const { exchange, routingKeyPattern, methodToCall} = consumerConfig;
    const connection = await amqp.connect(`amqp://${USER}:${PASSWORD}@${HOST}`);
    const channel = await connection.createChannel();
    await channel.assertExchange(exchange, 'topic', { durable: false });
    await channel.assertQueue("ec-c-"+exchange, { durable: true });
    await channel.bindQueue("ec-c-"+exchange, exchange, routingKeyPattern);

    console.log("Consumer listening on: "+exchange);
    
    await channel.consume(
        "Ecosystem-Queue",
            async (message) => {
              if (message !== null) {
                const content = message.content.toString();
                console.log(JSON.stringify(JSON.parse(message.content)));
                console.log('Consumer received event');
                // Process the event:
                const rmqContext = new RmqContext([message, channel, null]);
                await methodToCall.call(ecosystemController, content, rmqContext);
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
}
bootstrap();