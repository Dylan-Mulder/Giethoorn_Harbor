import { Controller, Get, Param, Post, Body, Delete, Put } from '@nestjs/common';
import { IShipService } from '../../interfaces/IShip.service';
import { Ship } from './entities/ship.entity';
import { CreateShipDTO } from './dto/create-ship.dto';
import { UpdateResult, DeleteResult } from 'typeorm';

@Controller('ships')
export class ShipController {
  constructor(private shipService: IShipService) { }

  @Post()
  public async createShip(@Body() createShipDTO: CreateShipDTO): Promise<Ship> {
    return await this.shipService.createShip(createShipDTO);
  }

  @Get(':shipId')
  public async getShipById(@Param() param: { shipId: number }): Promise<Ship> {
    return await this.shipService.getShipById(Number(param.shipId));
  }

  @Get()
  public async getAllShips(): Promise<Array<Ship>> {
    return await this.shipService.getAllShips();
  }

  @Get(':shipId/update')
  public async updateShipById(@Param() param: { shipId: number }, @Body() updateShip: CreateShipDTO): Promise<UpdateResult> {
    return await this.shipService.updateShipById(Number(param.shipId), updateShip);
  }

  @Get(':shipId/delete')
  public async deleteShip(@Param() param: { shipId: number }): Promise<DeleteResult> {
    return await this.shipService.deleteShipById(Number(param.shipId));
  }
}