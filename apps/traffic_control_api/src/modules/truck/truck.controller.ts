import { Controller, Get, Param, Post, Body, Delete, Put } from '@nestjs/common';
import { ITruckService } from '../../interfaces/ITruck.service';
import { Truck } from './entities/truck.entity';
import { CreateTruckDTO } from './dto/create-truck.dto';

@Controller('trucks')
export class TruckController {
  constructor(private readonly truckService: ITruckService) { }

  @Post()
  async createTruck(@Body() createTruckDTO: CreateTruckDTO): Promise<Truck> {
    return await this.truckService.createTruck(createTruckDTO);
  }

  @Get(':truckId')
  async getTruckById(@Param() param: { truckId: number }): Promise<Truck> {
    return await this.truckService.getTruckById(Number(param.truckId));
  }

  @Get()
  async getAllTrucks(): Promise<Array<Truck>> {
    return await this.truckService.getAllTrucks();
  }

  @Put(':truckId/update')
  async updateTruckById(@Param() param: { truckId: number }, @Body() updateTruck: CreateTruckDTO): Promise<Truck> {
    return await this.truckService.updateTruckById(Number(param.truckId), updateTruck);
  }

  @Delete(':truckId/delete')
  async deleteTruck(@Param() param: { truckId: number }): Promise<Truck> {
    return await this.truckService.deleteTruckById(Number(param.truckId));
  }
}