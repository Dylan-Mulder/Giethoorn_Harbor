import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DockRentalModule } from './microservice_dock_rental/dock_rental.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, RmqContext, Transport } from '@nestjs/microservices';
import { DockController } from './modules/dock/dock.controller';
import { LeaseAgreementController } from './modules/lease-agreement/lease-agreement.controller';
import { ShippingCompanyController } from './modules/shipping-company/shipping-company.controller';

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

  await app.listen(5001);
}
bootstrapAPI();


async function bootstrapDockRental() {
  const app = await NestFactory.create(DockRentalModule);

  const configService = app.get(ConfigService);

  const USER = configService.get('RABBITMQ_USER');
  const PASSWORD = configService.get('RABBITMQ_PASS');
  const HOST = configService.get('RABBITMQ_HOST');
  const QUEUE = configService.get('RABBITMQ_DOCK_RENTAL_QUEUE');
  const dockController = app.get(DockController);
  const leaseAgreementController = app.get(LeaseAgreementController);
  const shippingCompanyController= app.get(ShippingCompanyController);

  const consumerConfigs = [
    {
      exchange: 'ship-registered',
      routingKeyPattern: 'event.ship-registered',
      methodToCall: ""
    },
  ]

  for (const consumerConfig of consumerConfigs) {
    const { exchange, routingKeyPattern, methodToCall} = consumerConfig;
    const connection = await amqp.connect(`amqp://${USER}:${PASSWORD}@${HOST}`);
    const channel = await connection.createChannel();
    await channel.assertExchange(exchange, 'topic', { durable: false });
    await channel.assertQueue("rf-c-"+exchange, { durable: true });
    await channel.bindQueue("rf-c-"+exchange, exchange, routingKeyPattern);

    console.log("Consumer listening on: "+exchange);
    await channel.consume(
        "rf-c-"+exchange,
            async (message) => {
              if (message !== null) {
                const content = message.content.toString();
                console.log(JSON.stringify(JSON.parse(message.content)));
                console.log('Consumer received event');
                // Process the event:
                const rmqContext = new RmqContext([message, channel, null]);
                await methodToCall.call(, content, rmqContext);
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
bootstrapDockRental();