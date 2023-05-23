import { Module } from '@nestjs/common';
import { TrafficControlController } from './traffic-control.controller';
import { TrafficControlService } from './traffic-control.service';

@Module({
  imports: [],
  controllers: [TrafficControlController],
  providers: [TrafficControlService],
})
export class TrafficControlModule {}
