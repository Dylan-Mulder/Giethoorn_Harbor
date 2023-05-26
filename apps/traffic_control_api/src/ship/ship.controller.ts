import { Controller, Get, Param, Post, Body, Delete, Patch } from '@nestjs/common';
import { IShipService } from '../interfaces/IShipService';
import { Ship } from './ship.model';
import { DeleteResult } from 'typeorm';

@Controller('ship')
export class ShipController {
  constructor(private ShipService: IShipService) { }

  @Post()
  async createShip(@Body() Ship: Ship) {
    return await this.ShipService.createShip(Ship);
  }

  @Get()
  async getShipById(@Param() param: { ShipId: number }) {
    return await this.ShipService.getShipById(param.ShipId);
  }

  @Get()
  async getAllShips() {
    return await this.ShipService.getAllShips();
  }

  @Patch()
  async updateShipById(@Param() param: { ShipId: number }, @Body() updateShip: Ship) {
    return await this.ShipService.updateShipById(param.ShipId, updateShip);
  }

  @Delete()
  async deleteShip(@Param() param: { ShipId: number }) {
    return await this.ShipService.deleteShipById(param.ShipId);
  }
}