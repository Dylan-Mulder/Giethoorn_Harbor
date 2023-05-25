import { Controller, Get, Param, Post, Body, Delete, Patch } from '@nestjs/common';
import { IShipService } from '../../interfaces/IShipService';
import { Ship } from './ship.model';

@Controller('api/Ship')
export class ShipController {
  constructor(private ShipService: IShipService) { }

  @Post()
  async createShip(@Body() Ship: Ship) {
    return this.ShipService.createShip(Ship);
  }

  @Get()
  async getShipById(@Param() param: { ShipId: number }) {
    return this.ShipService.getShipById(param.ShipId);
  }

  @Get()
  async getAllShips() {
    return this.ShipService.getAllShips();
  }

  @Patch()
  async updateShipById(@Param() param: { ShipId: number }, @Body() updateShip: Ship) {
    return this.ShipService.updateShipById(param.ShipId, updateShip);
  }

  @Delete()
  async deleteShip(@Param() param: { ShipId: number }) {
    return this.ShipService.deleteShipById(param.ShipId);
  }
}