import { Controller, Get, Param, Post, Body, Delete, Patch } from '@nestjs/common';
import { Passage } from 'apps/traffic_control_api/src/models/Passage.model';
import { IPassageService } from '../interfaces/IPassageService';

@Controller('api/Passage')
export class PassageController {
  constructor(private PassageService: IPassageService) { }

  @Post()
  async createPassage(@Body() Passage: Passage) {
    return this.PassageService.createPassage(Passage);
  }

  @Get()
  async getPassageById(@Param() param: { PassageId: number }) {
    return this.PassageService.getPassageById(param.PassageId);
  }

  @Get()
  async getAllPassages() {
    return this.PassageService.getAllPassages();
  }

  @Patch()
  async updatePassageById(@Param() param: { PassageId: number }, @Body() updatePassage: Passage) {
    return this.PassageService.updatePassageById(param.PassageId, updatePassage);
  }

  @Delete()
  async deletePassage(@Param() param: { PassageId: number }) {
    return this.PassageService.deletePassageById(param.PassageId);
  }
}