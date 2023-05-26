import { Controller, Get, Param, Post, Body, Delete, Patch } from '@nestjs/common';
import { Tugboat } from './tugboat.model';
import { ITugboatService } from '../interfaces/ITugboatService';

@Controller('api/Tugboat')
export class TugboatController {
  constructor(private TugboatService: ITugboatService) { }

  @Post()
  async createTugboat(@Body() Tugboat: Tugboat) {
    return this.TugboatService.createTugboat(Tugboat);
  }

  @Get()
  async getTugboatById(@Param() param: { TugboatId: number }) {
    return this.TugboatService.getTugboatById(param.TugboatId);
  }

  @Get()
  async getAllTugboats() {
    return this.TugboatService.getAllTugboats();
  }

  @Patch()
  async updateTugboatById(@Param() param: { TugboatId: number }, @Body() updateTugboat: Tugboat) {
    return this.TugboatService.updateTugboatById(param.TugboatId, updateTugboat);
  }

  @Delete()
  async deleteTugboat(@Param() param: { TugboatId: number }) {
    return this.TugboatService.deleteTugboatById(param.TugboatId);
  }
}