import { Controller, Get, Param, Post, Body, Delete, Put } from '@nestjs/common';
import { Dock } from './entities/dock.entity';
import { IDockService } from '../../interfaces/IDock.service';
import { DockDTO } from './dto/dock.dto';
import { UpdateResult, DeleteResult } from 'typeorm';

@Controller('docks')
export class DockController {
  constructor(private readonly dockService: IDockService) { }

  @Post()
  public async createDock(@Body() dto: DockDTO): Promise<DockDTO> {
    return await this.dockService.createDock(dto);
  }

  @Get(':dockId')
  public async getDockById(@Param() param: { dockId: number }): Promise<DockDTO> {
    return await this.dockService.getDockById(Number(param.dockId));
  }

  @Get()
  public async getAllDocks(): Promise<Array<DockDTO>> {
    return await this.dockService.getAllDocks();
  }

  @Put(':dockId/update')
  public async updateDockById(@Param() param: { dockId: number }, @Body() updateDock: DockDTO): Promise<UpdateResult> {
    return await this.dockService.updateDockById(param.dockId, updateDock);
  }

  @Delete(':dockId/delete')
  public async deleteDockById(@Param() param: { dockId: number }): Promise<DeleteResult> {
    return await this.dockService.deleteDockById(param.dockId);
  }
}