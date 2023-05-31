import { Controller, Get, Param, Post, Body, Delete, Put } from '@nestjs/common';
import { IShipService } from '../../interfaces/IShip.service';
import { Ship } from './entities/ship.entity';
import { CreateShipDTO } from './dto/create-ship.dto';

@Controller('ships')
export class ShipController {
  constructor(private readonly shipService: IShipService) { }

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

  @Put(':shipId/update')
  public async updateShipById(@Param() param: { shipId: number }, @Body() updateShip: CreateShipDTO): Promise<Ship> {
    return await this.shipService.updateShipById(Number(param.shipId), updateShip);
  }

  @Delete(':shipId/delete')
  public async deleteShip(@Param() param: { shipId: number }): Promise<Ship> {
    return await this.shipService.deleteShipById(Number(param.shipId));
  }
}