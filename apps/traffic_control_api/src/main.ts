import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, RmqContext, Transport } from '@nestjs/microservices';
import { TrafficControlModule } from './microservice_traffic_control/traffic_control.module';
import { TrafficControlController } from './microservice_traffic_control/traffic_control.controller';
import * as amqp from 'amqplib';

//API
async function bootstrapAPI() {
  const appOptions = { cors: true };
  const app = await NestFactory.create(AppModule, appOptions);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('NestJS Realworld Example App')
    .setDescription('The Realworld API description')
    .setVersion('1.0')
    .setBasePath('api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(5000);
}
bootstrapAPI();

//Traffic Control
async function bootstrapTC() {
  const app = await NestFactory.create(TrafficControlModule);

  const configService = app.get(ConfigService);

  const USER = configService.get('RABBITMQ_USER');
  const PASSWORD = configService.get('RABBITMQ_PASS');
  const HOST = configService.get('RABBITMQ_HOST');
  const QUEUE = configService.get('RABBITMQ_TRAFFIC_CONTROL_QUEUE');
  const trafficControlController = app.get(TrafficControlController);
  const consumerConfigs = [
    {
      exchange: 'ship-has-been-cleared',
      routingKeyPattern: 'event.ship-has-been-cleared',
      methodToCall: trafficControlController.handleShipCleared
    },
    {
      exchange: 'ship-has-been-denied',
      routingKeyPattern: 'event.ship-has-been-denied',
      methodToCall: trafficControlController.handleShipDenied
    },
    {
      exchange: 'truck-has-been-cleared',
      routingKeyPattern: 'event.truck-has-been-cleared',
      methodToCall: trafficControlController.handleTruckCleared
    },
    {
      exchange: 'truck-has-been-denied',
      routingKeyPattern: 'event.truck-has-been-denied',
      methodToCall: trafficControlController.handleTruckDenied
    },
    {
      exchange: 'ship-has-been-unloaded',
      routingKeyPattern: 'event.ship-has-been-unloaded',
      methodToCall: trafficControlController.handleShipUnloaded
    },
    {
      exchange: 'ship-has-been-loaded',
      routingKeyPattern: 'event.ship-has-been-loaded',
      methodToCall: trafficControlController.handleShipLoaded
    },
    {
      exchange: 'lease-has-started',
      routingKeyPattern: 'event.lease-has-started',
      methodToCall: trafficControlController.handleLeaseStarted
    },
    {
      exchange: 'lease-has-expired',
      routingKeyPattern: 'event.lease-has-expired',
      methodToCall: trafficControlController.handleLeaseExpired
    },
  ];

  for (const consumerConfig of consumerConfigs) {
    const { exchange, routingKeyPattern, methodToCall } = consumerConfig;
    const connection = await amqp.connect(`amqp://${USER}:${PASSWORD}@${HOST}`);
    const channel = await connection.createChannel();
    await channel.assertExchange(exchange, 'topic', { durable: false });
    await channel.assertQueue("tc-c-" + exchange, { durable: true });
    await channel.bindQueue("tc-c-" + exchange, exchange, routingKeyPattern);

    console.log("Consumer listening on: " + exchange);
    await channel.consume(
      "tc-c-" + exchange,
      async (message) => {
        if (message !== null) {
          const content = message.content.toString();
          console.log(JSON.stringify(message.content));
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
bootstrapTC();