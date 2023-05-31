import { Controller, Post, Get, Param, Put, Body, Delete, UseInterceptors } from "@nestjs/common";
import { IPassageService } from "../../interfaces/IPassage.service";
import { CreatePassageDTO } from "./dto/create-passage.dto";
import { Passage } from "./entities/passage.entity";
import { ApiTags } from "@nestjs/swagger";
import { ExceptionInterceptor } from "../../interceptors/exception.interceptor";
import { LoggingInterceptor } from "../../interceptors/logging.interceptor";
import { TimeoutInterceptor } from "../../interceptors/timeout.interceptor";
import { TransformationInterceptor } from "../../interceptors/transform.interceptor";

@Controller('passages')
@ApiTags('passages')
@UseInterceptors(LoggingInterceptor, TransformationInterceptor, ExceptionInterceptor, TimeoutInterceptor)
export class PassageController {
  constructor(private readonly passageService: IPassageService) { }

  @Post()
  public async createPassage(@Body() createPassageDTO: CreatePassageDTO): Promise<Passage> {
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
  public async updatePassageById(@Param() param: { passageId: number }, @Body() updateDock: CreatePassageDTO): Promise<Passage> {
    return await this.passageService.updatePassageById(Number(param.passageId), updateDock);
  }

  @Delete(':passageId/delete')
  public async deletePassageById(@Param() param: { passageId: number }): Promise<Passage> {
    return await this.passageService.deletePassageById(Number(param.passageId));
  }
}