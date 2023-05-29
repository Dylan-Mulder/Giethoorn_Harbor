import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { RefillingModule } from './refilling.module';
import * as amqp from 'amqplib';

async function bootstrap() {
  const app = await NestFactory.create(RefillingModule);

  const configService = app.get(ConfigService);

  const USER = configService.get('RABBITMQ_USER');
  const PASSWORD = configService.get('RABBITMQ_PASS');
  const HOST = configService.get('RABBITMQ_HOST');
  const QUEUE = configService.get('RABBITMQ_REFILLING_QUEUE');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
      queue: QUEUE,
      queueOptions: {
        durable: true,
      },
    },
  });

  const channel = await amqp.connect(`amqp://${USER}:${PASSWORD}@${HOST}`);
  const queue = await channel.createChannel();

  await queue.assertQueue(QUEUE, { durable: true });
  await queue.prefetch(1);

  queue.consume(QUEUE, async (message) => {

    // Acknowledge the message
    queue.ack(message);

    console.log('I GOT MESSAGE: ' + message.content.toString())

    if (message) {
      const data = JSON.parse(message.content.toString());
      
    }
  });

  app.startAllMicroservices();
  await app.listen(5672);

  process.on('exit', () => {
    channel.close();
  });
}

bootstrap();
