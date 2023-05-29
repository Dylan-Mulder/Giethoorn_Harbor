import { Module } from '@nestjs/common';
import { TrafficControlController } from './traffic_control.controller';
import { ConfigModule } from '@nestjs/config';
import { TrafficControlService } from './traffic_control.service';
import { RabbitMQService } from './Rabbitmq.Service';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env'
    })
  ],
  controllers: [TrafficControlController],
  providers: [TrafficControlService,RabbitMQService],
})
export class TrafficControlModule { }