import { Controller, Get, Param, Post, Body, Delete, Patch } from '@nestjs/common';
import { TrafficPlanning } from './trafficPlanning.entity';
import { ITrafficPlanningService } from '../../interfaces/ITrafficPlanning.service';

@Controller('traffic-planning')
export class TrafficPlanningController {
  constructor(private TrafficPlanningService: ITrafficPlanningService) { }

  @Post()
  async createTrafficPlanning(@Body() TrafficPlanning: TrafficPlanning) {
    return await this.TrafficPlanningService.createTrafficPlanning(TrafficPlanning);
  }

  @Get()
  async getTrafficPlanningById(@Param() param: { TrafficPlanningId: number }) {
    return await this.TrafficPlanningService.getTrafficPlanningById(param.TrafficPlanningId);
  }

  @Get()
  async getAllTrafficPlannings() {
    return await this.TrafficPlanningService.getAllTrafficPlannings();
  }

  @Patch()
  async updateTrafficPlanningById(@Param() param: { TrafficPlanningId: number }, @Body() updateTrafficPlanning: TrafficPlanning) {
    return await this.TrafficPlanningService.updateTrafficPlanningById(param.TrafficPlanningId, updateTrafficPlanning);
  }

  @Delete()
  async deleteTrafficPlanning(@Param() param: { TrafficPlanningId: number }) {
    return await this.TrafficPlanningService.deleteTrafficPlanningById(param.TrafficPlanningId);
  }
}