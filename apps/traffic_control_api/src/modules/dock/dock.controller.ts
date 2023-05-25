import { Controller, Get, Param, Post, Body, Delete, Patch } from '@nestjs/common';
import { IDockService } from '../../interfaces/IDockService';
import { Dock } from './dock.model';

@Controller('api/dock')
export class DockController {
  constructor(private dockService: IDockService) { }

  @Post()
  async createDock(@Body() dock: Dock) {
    return this.dockService.createDock(dock);
  }

  @Get()
  async getDockById(@Param() param: { dockId: number }) {
    return this.dockService.getDockById(param.dockId);
  }

  @Get()
  async getAllDocks() {
    return this.dockService.getAllDocks();
  }

  @Patch()
  async updateDockById(@Param() param: { dockId: number }, @Body() updateDock: Dock) {
    return this.dockService.updateDockById(param.dockId, updateDock);
  }

  @Delete()
  async deleteDock(@Param() param: { dockId: number }) {
    return this.dockService.deleteDockById(param.dockId);
  }
}