import { Controller, Get, Param, Post, Body, Delete, Patch } from '@nestjs/common';
import { Truck } from './truck.model';
import { ITruckService } from '../interfaces/ITruckService';
import { DeleteResult } from 'typeorm';

@Controller('truck')
export class TruckController {
  constructor(private TruckService: ITruckService) { }

  @Post()
  async createTruck(@Body() Truck: Truck) {
    return await this.TruckService.createTruck(Truck);
  }

  @Get()
  async getTruckById(@Param() param: { TruckId: number }) {
    return await this.TruckService.getTruckById(param.TruckId);
  }

  @Get()
  async getAllTrucks() {
    return await this.TruckService.getAllTrucks();
  }

  @Patch()
  async updateTruckById(@Param() param: { TruckId: number }, @Body() updateTruck: Truck) {
    return await this.TruckService.updateTruckById(param.TruckId, updateTruck);
  }

  @Delete()
  async deleteTruck(@Param() param: { TruckId: number }) {
    return await this.TruckService.deleteTruckById(param.TruckId);
  }
}