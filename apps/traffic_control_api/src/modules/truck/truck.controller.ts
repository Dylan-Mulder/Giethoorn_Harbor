import { Controller, Get, Param, Post, Body, Delete, Put, UseInterceptors, UseFilters } from '@nestjs/common';
import { ITruckService } from '../../interfaces/ITruck.service';
import { Truck } from './entities/truck.entity';
import { CreateTruckDTO } from './dto/create-truck.dto';
import { ApiTags } from '@nestjs/swagger';
import { ExceptionInterceptor } from '../../interceptors/exception.interceptor';
import { LoggingInterceptor } from '../../interceptors/logging.interceptor';
import { TimeoutInterceptor } from '../../interceptors/timeout.interceptor';
import { ValidationInterceptor } from '../../interceptors/validation.interceptor';
import { HttpExceptionFilter } from '../../filters/http-exception.filter';

@Controller('trucks')
@ApiTags('trucks')
@UseInterceptors(LoggingInterceptor, ExceptionInterceptor, TimeoutInterceptor, ValidationInterceptor)
export class TruckController {
  constructor(private readonly truckService: ITruckService) { }

  @Post()
  @UseFilters(new HttpExceptionFilter())
  async createTruck(@Body() createTruckDTO: CreateTruckDTO): Promise<Truck> {
    return await this.truckService.createTruck(createTruckDTO);
  }

  @Get(':truckId')
  @UseFilters(new HttpExceptionFilter())
  async getTruckById(@Param() param: { truckId: number }): Promise<Truck> {
    return await this.truckService.getTruckById(Number(param.truckId));
  }

  @Get()
  @UseFilters(new HttpExceptionFilter())
  async getAllTrucks(): Promise<Array<Truck>> {
    return await this.truckService.getAllTrucks();
  }

  @Put(':truckId/update')
  @UseFilters(new HttpExceptionFilter())
  async updateTruckById(@Param() param: { truckId: number }, @Body() updateTruck: CreateTruckDTO): Promise<Truck> {
    return await this.truckService.updateTruckById(Number(param.truckId), updateTruck);
  }

  @Delete(':truckId/delete')
  @UseFilters(new HttpExceptionFilter())
  async deleteTruck(@Param() param: { truckId: number }): Promise<Truck> {
    return await this.truckService.deleteTruckById(Number(param.truckId));
  }
}