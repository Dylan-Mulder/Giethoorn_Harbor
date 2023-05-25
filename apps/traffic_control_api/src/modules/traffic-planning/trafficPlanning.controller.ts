import { Controller, Get, Param, Post, Body, Delete, Patch } from '@nestjs/common';
import { TrafficPlanning } from './trafficPlanning.model';
import { ITrafficPlanningService } from '../../interfaces/ITrafficPlanning';

@Controller('api/TrafficPlanning')
export class TrafficPlanningController {
  constructor(private TrafficPlanningService: ITrafficPlanningService) { }

  @Post()
  async createTrafficPlanning(@Body() TrafficPlanning: TrafficPlanning) {
    return this.TrafficPlanningService.createTrafficPlanning(TrafficPlanning);
  }

  @Get()
  async getTrafficPlanningById(@Param() param: { TrafficPlanningId: number }) {
    return this.TrafficPlanningService.getTrafficPlanningById(param.TrafficPlanningId);
  }

  @Get()
  async getAllTrafficPlannings() {
    return this.TrafficPlanningService.getAllTrafficPlannings();
  }

  @Patch()
  async updateTrafficPlanningById(@Param() param: { TrafficPlanningId: number }, @Body() updateTrafficPlanning: TrafficPlanning) {
    return this.TrafficPlanningService.updateTrafficPlanningById(param.TrafficPlanningId, updateTrafficPlanning);
  }

  @Delete()
  async deleteTrafficPlanning(@Param() param: { TrafficPlanningId: number }) {
    return this.TrafficPlanningService.deleteTrafficPlanningById(param.TrafficPlanningId);
  }
}