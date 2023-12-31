import { Controller, Get, Param, Post, Body, Delete, Put, Patch, UseInterceptors, UseFilters } from '@nestjs/common';
import { IShipService } from '../../interfaces/IShip.service';
import { Ship } from './entities/ship.entity';
import { CreateShipDTO } from './dto/create-ship.dto';
import { ApiTags } from '@nestjs/swagger';
import { ExceptionInterceptor } from '../../interceptors/exception.interceptor';
import { LoggingInterceptor } from '../../interceptors/logging.interceptor';
import { ValidationInterceptor } from "../../interceptors/validation.interceptor";
import { TimeoutInterceptor } from '../../interceptors/timeout.interceptor';
import { HttpExceptionFilter } from '../../filters/http-exception.filter';

@Controller('ships')
@ApiTags('ships')
@UseInterceptors(LoggingInterceptor, ExceptionInterceptor, TimeoutInterceptor, ValidationInterceptor)
export class ShipController {
  constructor(private readonly shipService: IShipService) { }

  @Post()
  @UseFilters(new HttpExceptionFilter())
  public async createShip(@Body() createShipDTO: CreateShipDTO): Promise<Ship> {
    return await this.shipService.createShip(createShipDTO);
  }

  @Get(':shipId')
  @UseFilters(new HttpExceptionFilter())
  public async getShipById(@Param() param: { shipId: number }): Promise<Ship> {
    return await this.shipService.getShipById(Number(param.shipId));
  }

  @Get()
  @UseFilters(new HttpExceptionFilter())
  public async getAllShips(): Promise<Array<Ship>> {
    return await this.shipService.getAllShips();
  }

  @Put(':shipId/update')
  @UseFilters(new HttpExceptionFilter())
  public async updateShipById(@Param() param: { shipId: number }, @Body() updateShip: CreateShipDTO): Promise<Ship> {
    return await this.shipService.updateShipById(Number(param.shipId), updateShip);
  }

  @Delete(':shipId/delete')
  @UseFilters(new HttpExceptionFilter())
  public async deleteShip(@Param() param: { shipId: number }): Promise<Ship> {
    return await this.shipService.deleteShipById(Number(param.shipId));
  }

  @Patch(':shipId/dock')
  @UseFilters(new HttpExceptionFilter())
  public async dockShip(@Param() param: { shipId: number }): Promise<Ship> {
    return await this.shipService.dockShip(Number(param.shipId));
  }
}