import { Module } from '@nestjs/common';
import { TrafficPlanningService } from './trafficPlanning.service';
import { TrafficPlanningController } from './trafficPlanning.controller';
import { TrafficPlanning } from './trafficPlanning.model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TrafficPlanning])],
  controllers: [TrafficPlanningController],
  providers: [TrafficPlanningService],
})
export class TrafficPlanningModule { }
