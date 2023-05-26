import { Controller, Get, Param, Post, Body, Delete, Patch } from '@nestjs/common';
import { IPassageService } from '../interfaces/IPassageService';
import { Passage } from './passage.model';
import { DeleteResult } from 'typeorm';

@Controller('passage')
export class PassageController {
  constructor(private PassageService: IPassageService) { }

  @Post()
  async createPassage(@Body() Passage: Passage) {
    return await this.PassageService.createPassage(Passage);
  }

  @Get()
  async getPassageById(@Param() param: { PassageId: number }) {
    return await this.PassageService.getPassageById(param.PassageId);
  }

  @Get()
  async getAllPassages() {
    return await this.PassageService.getAllPassages();
  }

  @Patch()
  async updatePassageById(@Param() param: { PassageId: number }, @Body() updatePassage: Passage) {
    return await this.PassageService.updatePassageById(param.PassageId, updatePassage);
  }

  @Delete()
  async deletePassage(@Param() param: { PassageId: number }) {
    return await this.PassageService.deletePassageById(param.PassageId);
  }
}