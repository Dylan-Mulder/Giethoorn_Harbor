import { Controller, Get, Param, Post, Body, Delete, Patch } from '@nestjs/common';
import { IDockService } from '../../interfaces/IDock.service';
import { Dock } from './dock.entity';

@Controller('dock')
export class DockController {
  constructor(private readonly dockService: IDockService) { }

  @Post()
  async createDock(@Body() dock: Dock) {
    return await this.dockService.createDock(dock);
  }

  @Get()
  async getDockById(@Param() param: { dockId: number }) {
    return await this.dockService.getDockById(param.dockId);
  }

  @Get()
  async getAllDocks() {
    return await this.dockService.getAllDocks();
  }

  @Patch()
  async updateDockById(@Param() param: { dockId: number }, @Body() updateDock: Dock) {
    return await this.dockService.updateDockById(param.dockId, updateDock);
  }

  @Delete()
  async deleteDock(@Param() param: { dockId: number }) {
    return await this.dockService.deleteDockById(param.dockId);
  }
}