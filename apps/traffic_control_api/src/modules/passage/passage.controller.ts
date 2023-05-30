import { Controller, Post, Get, Param, Put, Body, Delete } from "@nestjs/common";
import { UpdateResult, DeleteResult } from "typeorm";
import { IPassageService } from "../../interfaces/IPassage.service";
import { CreatePassageDTO } from "./dto/create-passage.dto";
import { Passage } from "./entities/passage.entity";

@Controller('passages')
export class PassageController {
  constructor(private readonly passageService: IPassageService) { }

  @Post()
  public async createPassage(createPassageDTO: CreatePassageDTO): Promise<Passage> {
    return await this.passageService.createPassage(createPassageDTO);
  }

  @Get(':passageId')
  public async getPassageById(@Param() param: { passageId: number }): Promise<Passage> {
    return await this.passageService.getPassageById(Number(param.passageId));
  }

  @Get()
  public async getAllPassages(): Promise<Array<Passage>> {
    return await this.passageService.getAllPassages();
  }

  @Put(':passageId/update')
  public async updatePassageById(@Param() param: { passageId: number }, @Body() updateDock: CreatePassageDTO): Promise<UpdateResult> {
    return await this.passageService.updatePassageById(Number(param.passageId), updateDock);
  }

  @Delete(':passageId/delete')
  public async deletePassageById(@Param() param: { passageId: number }): Promise<DeleteResult> {
    return await this.passageService.deletePassageById(Number(param.passageId));
  }
}