import { Controller, Get, Param, Post, Body, Delete, Put, UseInterceptors, UseFilters } from '@nestjs/common';
import { IDockService } from '../../interfaces/IDock.service';
import { CreateDockDTO } from './dto/create-dock.dto';
import { Dock } from './entities/dock.entity';
import { LoggingInterceptor } from '../../interceptors/logging.interceptor';
import { ApiTags } from '@nestjs/swagger';
import { ExceptionInterceptor } from '../../interceptors/exception.interceptor';
import { TimeoutInterceptor } from '../../interceptors/timeout.interceptor';
import { ValidationInterceptor } from '../../interceptors/validation.interceptor';
import { HttpExceptionFilter } from '../../filters/http-exception.filter';

@Controller('docks')
@ApiTags('docks')
@UseInterceptors(LoggingInterceptor, ExceptionInterceptor, TimeoutInterceptor, ValidationInterceptor)
export class DockController {
  constructor(private readonly dockService: IDockService) { }

  @Post()
  @UseFilters(new HttpExceptionFilter())
  public async createDock(@Body() createDockDTO: CreateDockDTO): Promise<Dock> {
    return await this.dockService.createDock(createDockDTO);
  }

  @Get(':dockId')
  @UseFilters(new HttpExceptionFilter())
  public async getDockById(@Param() param: { dockId: number }): Promise<Dock> {
    return await this.dockService.getDockById(Number(param.dockId));
  }

  @Get()
  @UseFilters(new HttpExceptionFilter())
  public async getAllDocks(): Promise<Array<Dock>> {
    return await this.dockService.getAllDocks();
  }

  @Put(':dockId/update')
  @UseFilters(new HttpExceptionFilter())
  public async updateDockById(@Param() param: { dockId: number }, @Body() updateDock: CreateDockDTO): Promise<Dock> {
    return await this.dockService.updateDockById(param.dockId, updateDock);
  }

  @Delete(':dockId/delete')
  @UseFilters(new HttpExceptionFilter())
  public async deleteDockById(@Param() param: { dockId: number }): Promise<Dock> {
    return await this.dockService.deleteDockById(param.dockId);
  }
}