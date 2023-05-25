import { Controller, Get, Param, Post, Body, Delete, Patch } from '@nestjs/common';
import { Truck } from 'apps/traffic_control_api/src/models/Truck.model';
import { ITruckService } from '../interfaces/ITruckService';

@Controller('api/Truck')
export class TruckController {
  constructor(private TruckService: ITruckService) { }

  @Post()
  async createTruck(@Body() Truck: Truck) {
    return this.TruckService.createTruck(Truck);
  }

  @Get()
  async getTruckById(@Param() param: { TruckId: number }) {
    return this.TruckService.getTruckById(param.TruckId);
  }

  @Get()
  async getAllTrucks() {
    return this.TruckService.getAllTrucks();
  }

  @Patch()
  async updateTruckById(@Param() param: { TruckId: number }, @Body() updateTruck: Truck) {
    return this.TruckService.updateTruckById(param.TruckId, updateTruck);
  }

  @Delete()
  async deleteTruck(@Param() param: { TruckId: number }) {
    return this.TruckService.deleteTruckById(param.TruckId);
  }
}