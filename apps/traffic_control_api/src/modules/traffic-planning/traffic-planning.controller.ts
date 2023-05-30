import { Controller, Get, Param, Post, Body, Delete, Put } from '@nestjs/common';
import { ITrafficPlanningService } from '../../interfaces/ITrafficPlanning.service';
import { TrafficPlanning } from './entities/traffic-planning.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateTrafficPlanningDTO } from './dto/create-traffic-planning.dto';


@Controller('traffic-plannings')
export class TrafficPlanningController {
  constructor(private trafficPlanningService: ITrafficPlanningService) { }

  @Post()
  async createTrafficPlanning(@Body() createTrafficPlanningDTO: CreateTrafficPlanningDTO): Promise<TrafficPlanning> {
    return await this.trafficPlanningService.createTrafficPlanning(createTrafficPlanningDTO);
  }

  @Get(':trafficPlanningId')
  async getTrafficPlanningById(@Param() param: { trafficPlanningId: number }): Promise<TrafficPlanning> {
    return await this.trafficPlanningService.getTrafficPlanningById(Number(param.trafficPlanningId));
  }

  @Get()
  async getAllTrafficPlannings(): Promise<Array<TrafficPlanning>> {
    return await this.trafficPlanningService.getAllTrafficPlannings();
  }

  @Put(':trafficPlanningId/update')
  async updateTrafficPlanningById(@Param() param: { trafficPlanningId: number }, @Body() updateTrafficPlanning: CreateTrafficPlanningDTO): Promise<UpdateResult> {
    return await this.trafficPlanningService.updateTrafficPlanningById(Number(param.trafficPlanningId), updateTrafficPlanning);
  }

  @Delete(':trafficPlanningId/delete')
  async deleteTrafficPlanning(@Param() param: { trafficPlanningId: number }): Promise<DeleteResult> {
    return await this.trafficPlanningService.deleteTrafficPlanningById(Number(param.trafficPlanningId));
  }
}