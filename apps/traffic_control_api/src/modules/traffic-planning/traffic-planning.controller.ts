import { Controller, Get, Param, Post, Body, Delete, Put, UseInterceptors, UseFilters } from '@nestjs/common';
import { ITrafficPlanningService } from '../../interfaces/ITrafficPlanning.service';
import { TrafficPlanning } from './entities/traffic-planning.entity';
import { CreateTrafficPlanningDTO } from './dto/create-traffic-planning.dto';
import { ApiTags } from '@nestjs/swagger';
import { ExceptionInterceptor } from '../../interceptors/exception.interceptor';
import { LoggingInterceptor } from '../../interceptors/logging.interceptor';
import { TimeoutInterceptor } from '../../interceptors/timeout.interceptor';
import { ValidationInterceptor } from '../../interceptors/validation.interceptor';
import { HttpExceptionFilter } from '../../filters/http-exception.filter';


@Controller('traffic-plannings')
@ApiTags('traffic-plannings')
@UseInterceptors(LoggingInterceptor, ExceptionInterceptor, TimeoutInterceptor, ValidationInterceptor)
export class TrafficPlanningController {
  constructor(private readonly trafficPlanningService: ITrafficPlanningService) { }
  @UseFilters(new HttpExceptionFilter())

  @Post()
  @UseFilters(new HttpExceptionFilter())
  async createTrafficPlanning(@Body() createTrafficPlanningDTO: CreateTrafficPlanningDTO): Promise<TrafficPlanning> {
    return await this.trafficPlanningService.createTrafficPlanning(createTrafficPlanningDTO);
  }

  @Get(':trafficPlanningId')
  @UseFilters(new HttpExceptionFilter())
  async getTrafficPlanningById(@Param() param: { trafficPlanningId: number }): Promise<TrafficPlanning> {
    return await this.trafficPlanningService.getTrafficPlanningById(Number(param.trafficPlanningId));
  }

  @Get()
  @UseFilters(new HttpExceptionFilter())
  async getAllTrafficPlannings(): Promise<Array<TrafficPlanning>> {
    return await this.trafficPlanningService.getAllTrafficPlannings();
  }

  @Put(':trafficPlanningId/update')
  @UseFilters(new HttpExceptionFilter())
  async updateTrafficPlanningById(@Param() param: { trafficPlanningId: number }, @Body() updateTrafficPlanning: CreateTrafficPlanningDTO): Promise<TrafficPlanning> {
    return await this.trafficPlanningService.updateTrafficPlanningById(Number(param.trafficPlanningId), updateTrafficPlanning);
  }

  @Delete(':trafficPlanningId/delete')
  @UseFilters(new HttpExceptionFilter())
  async deleteTrafficPlanning(@Param() param: { trafficPlanningId: number }): Promise<TrafficPlanning> {
    return await this.trafficPlanningService.deleteTrafficPlanningById(Number(param.trafficPlanningId));
  }
}