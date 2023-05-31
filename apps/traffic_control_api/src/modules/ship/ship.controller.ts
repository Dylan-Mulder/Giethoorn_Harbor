import { Controller, Get, Param, Post, Body, Delete, Put, UseInterceptors } from '@nestjs/common';
import { IShipService } from '../../interfaces/IShip.service';
import { Ship } from './entities/ship.entity';
import { CreateShipDTO } from './dto/create-ship.dto';
import { ApiTags } from '@nestjs/swagger';
import { ExceptionInterceptor } from '../../interceptors/exception.interceptor';
import { LoggingInterceptor } from '../../interceptors/logging.interceptor';
import { ValidationInterceptor } from "../../interceptors/validation.interceptor";
import { TimeoutInterceptor } from '../../interceptors/timeout.interceptor';

@Controller('ships')
@ApiTags('ships')
@UseInterceptors(LoggingInterceptor, ExceptionInterceptor, TimeoutInterceptor, ValidationInterceptor)
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