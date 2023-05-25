import { Module } from '@nestjs/common';
import { TrafficPlanningService } from './trafficPlanning.service';
import { TrafficPlanningController } from './trafficPlanning.controller';

@Module({
  controllers: [TrafficPlanningController],
  providers: [TrafficPlanningService]
})
export class TrafficPlanningModule { }
