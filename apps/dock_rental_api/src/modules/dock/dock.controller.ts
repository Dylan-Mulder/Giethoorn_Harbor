import { Controller, Get, Param, Post, Body, Delete, Patch } from '@nestjs/common';
import { Dock } from './dock.entity';
import { IDockService } from '../../interfaces/IDock.service';
import { DockDTO } from './dock.dto';

@Controller('dock')
export class DockController {
  constructor(private readonly dockService: IDockService) { }

  @Post()
  async createDock(@Body() dto: DockDTO): Promise<DockDTO> {
    return await this.dockService.createDock(dto);
  }

  @Get(':id')
  async getDockById(@Param('id') id: number): Promise<Dock> {
    return await this.dockService.getDockById(Number(id));
  }

  @Get()
  async getAllDocks(): Promise<Array<DockDTO>> {
    return await this.dockService.getAllDocks();
  }

  @Patch(':param')
  async updateDockById(@Param() param: { dockId: number }, @Body() updateDock: DockDTO) {
    return await this.dockService.updateDockById(param.dockId, updateDock);
  }

  @Delete(':param')
  async deleteDockById(@Param() param: { dockId: number }) {
    return await this.dockService.deleteDockById(param.dockId);
  }
}