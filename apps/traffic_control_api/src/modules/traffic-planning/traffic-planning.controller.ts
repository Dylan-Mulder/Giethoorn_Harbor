import { Controller, Get, Param, Post, Body, Delete, Put, UseInterceptors } from '@nestjs/common';
import { ITrafficPlanningService } from '../../interfaces/ITrafficPlanning.service';
import { TrafficPlanning } from './entities/traffic-planning.entity';
import { CreateTrafficPlanningDTO } from './dto/create-traffic-planning.dto';
import { ApiTags } from '@nestjs/swagger';
import { ExceptionInterceptor } from '../../interceptors/exception.interceptor';
import { LoggingInterceptor } from '../../interceptors/logging.interceptor';
import { TimeoutInterceptor } from '../../interceptors/timeout.interceptor';
import { TransformationInterceptor } from '../../interceptors/transform.interceptor';


@Controller('traffic-plannings')
@ApiTags('traffic-plannings')
@UseInterceptors(LoggingInterceptor, TransformationInterceptor, ExceptionInterceptor, TimeoutInterceptor)
export class TrafficPlanningController {
  constructor(private readonly trafficPlanningService: ITrafficPlanningService) { }

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
  async updateTrafficPlanningById(@Param() param: { trafficPlanningId: number }, @Body() updateTrafficPlanning: CreateTrafficPlanningDTO): Promise<TrafficPlanning> {
    return await this.trafficPlanningService.updateTrafficPlanningById(Number(param.trafficPlanningId), updateTrafficPlanning);
  }

  @Delete(':trafficPlanningId/delete')
  async deleteTrafficPlanning(@Param() param: { trafficPlanningId: number }): Promise<TrafficPlanning> {
    return await this.trafficPlanningService.deleteTrafficPlanningById(Number(param.trafficPlanningId));
  }
}