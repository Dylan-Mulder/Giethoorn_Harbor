import { Controller, Get, Param, Post, Body, Delete, Put } from '@nestjs/common';
import { ITugboatService } from '../../interfaces/ITugboat.service';
import { Tugboat } from './entities/tugboat.entity';
import { CreateTugboatDTO } from './dto/create-tugboat.dto';

@Controller('tugboats')
export class TugboatController {
  constructor(private readonly tugboatService: ITugboatService) { }

  @Post()
  async createTugboat(@Body() createTugboatDTO: CreateTugboatDTO): Promise<Tugboat> {
    return await this.tugboatService.createTugboat(createTugboatDTO);
  }

  @Get(':tugboatId')
  async getTugboatById(@Param() param: { tugboatId: number }): Promise<Tugboat> {
    return await this.tugboatService.getTugboatById(param.tugboatId);
  }

  @Get()
  async getAllTugboats(): Promise<Array<Tugboat>> {
    return await this.tugboatService.getAllTugboats();
  }

  @Put(':tugboatId/update')
  async updateTugboatById(@Param() param: { tugboatId: number }, @Body() updateTugboat: CreateTugboatDTO): Promise<Tugboat> {
    return await this.tugboatService.updateTugboatById(param.tugboatId, updateTugboat);
  }

  @Delete(':tugboatId/delete')
  async deleteTugboat(@Param() param: { tugboatId: number }): Promise<Tugboat> {
    return await this.tugboatService.deleteTugboatById(param.tugboatId);
  }
}