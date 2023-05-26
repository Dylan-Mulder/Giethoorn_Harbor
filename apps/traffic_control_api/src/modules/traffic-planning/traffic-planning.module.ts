import { Module } from '@nestjs/common';
import { TrafficPlanningService } from './trafficPlanning.service';
import { TrafficPlanningController } from './trafficPlanning.controller';

@Module({
  controllers: [TrafficPlanningController],
  exports: [TrafficPlanningService]
})
export class TrafficPlanningModule { }
