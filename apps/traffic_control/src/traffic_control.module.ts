import { Module } from '@nestjs/common';
import { TrafficControlController } from './traffic_control.controller';
import { TrafficControlService } from './traffic_control.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env'
    })
  ],
  controllers: [TrafficControlController],
  providers: [TrafficControlService],
})
export class TrafficControlModule { }
