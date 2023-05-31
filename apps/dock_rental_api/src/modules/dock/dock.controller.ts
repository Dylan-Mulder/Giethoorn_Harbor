import { Controller, Get, Param, Post, Body, Delete, Put, UseInterceptors } from '@nestjs/common';
import { IDockService } from '../../interfaces/IDock.service';
import { CreateDockDTO } from './dto/create-dock.dto';
import { Dock } from './entities/dock.entity';
import { LoggingInterceptor } from '../../interceptors/logging.interceptor';
import { ApiTags } from '@nestjs/swagger';
import { TransformationInterceptor } from '../../interceptors/transform.interceptor';
import { ExceptionInterceptor } from '../../interceptors/exception.interceptor';
import { TimeoutInterceptor } from '../../interceptors/timeout.interceptor';

@Controller('docks')
@ApiTags('docks')
@UseInterceptors(LoggingInterceptor, TransformationInterceptor, ExceptionInterceptor, TimeoutInterceptor)
export class DockController {
  constructor(private readonly dockService: IDockService) { }

  @Post()
  public async createDock(@Body() createDockDTO: CreateDockDTO): Promise<Dock> {
    return await this.dockService.createDock(createDockDTO);
  }

  @Get(':dockId')
  public async getDockById(@Param() param: { dockId: number }): Promise<Dock> {
    return await this.dockService.getDockById(Number(param.dockId));
  }

  @Get()
  public async getAllDocks(): Promise<Array<Dock>> {
    return await this.dockService.getAllDocks();
  }

  @Put(':dockId/update')
  public async updateDockById(@Param() param: { dockId: number }, @Body() updateDock: CreateDockDTO): Promise<Dock> {
    return await this.dockService.updateDockById(param.dockId, updateDock);
  }

  @Delete(':dockId/delete')
  public async deleteDockById(@Param() param: { dockId: number }): Promise<Dock> {
    return await this.dockService.deleteDockById(param.dockId);
  }
}