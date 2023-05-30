import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, RmqContext, Transport } from '@nestjs/microservices';
import { TrafficControlModule } from './traffic_control.module';
import { TrafficControlController } from './traffic_control.controller';

async function bootstrap() {
  const app = await NestFactory.create(TrafficControlModule);

  const configService = app.get(ConfigService);

  const USER = configService.get('RABBITMQ_USER');
  const PASSWORD = configService.get('RABBITMQ_PASS');
  const HOST = configService.get('RABBITMQ_HOST');
  const QUEUE = configService.get('RABBITMQ_TRAFFIC_CONTROL_QUEUE');
  const trafficControlController = app.get(TrafficControlController);
  const consumerConfigs = [
    {
      exchange: '',
      routingKeyPattern: 'event.',
      methodToCall: trafficControlController.getHello
    },
  ]
  for (const consumerConfig of consumerConfigs) {
    const { exchange, routingKeyPattern, methodToCall} = consumerConfig;
    const connection = await amqp.connect(`amqp://${USER}:${PASSWORD}@${HOST}`);
    const channel = await connection.createChannel();
    await channel.assertExchange(exchange, 'topic', { durable: false });
    await channel.assertQueue("tc-c-"+exchange, { durable: true });
    await channel.bindQueue("tc-c-"+exchange, exchange, routingKeyPattern);

    console.log("Consumer listening on: "+exchange);
    await channel.consume(
        "tc-c-"+exchange,
            async (message) => {
              if (message !== null) {
                const content = message.content.toString();
                console.log(JSON.stringify(JSON.parse(message.content)));
                console.log('Consumer received event');
                // Process the event:
                const rmqContext = new RmqContext([message, channel, null]);
                await methodToCall.call(trafficControlController, content, rmqContext);
              }
            },
      );
  }
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
      noAck: false,
      queue: QUEUE,
      queueOptions: {
        durable: true
      }
    }
  })

  app.startAllMicroservices();
}
bootstrap();