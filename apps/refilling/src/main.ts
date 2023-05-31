import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RefillingModule } from './refilling.module';
import { Ship } from './entities/ship.entity';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config';
import { Repository } from 'typeorm';

async function bootstrap() {
  
  const app = await NestFactory.create(RefillingModule);

  TypeOrmModule.forRoot(configService.getTypeOrmConfig())

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}`],
      noAck: false,
      queue: process.env.RABBITMQ_REFILLING_QUEUE,
      queueOptions: {
        durable: true
      }
    }
  })

  await app.startAllMicroservices();
}
bootstrap();


//https://github.com/Denrox/nestjs-microservices-example/blob/master/task/src/main.ts
