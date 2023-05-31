import { Controller, Post, Get, Param, Put, Body, Delete, UseInterceptors, UseFilters } from "@nestjs/common";
import { IPassageService } from "../../interfaces/IPassage.service";
import { CreatePassageDTO } from "./dto/create-passage.dto";
import { Passage } from "./entities/passage.entity";
import { ApiTags } from "@nestjs/swagger";
import { ExceptionInterceptor } from "../../interceptors/exception.interceptor";
import { LoggingInterceptor } from "../../interceptors/logging.interceptor";
import { ValidationInterceptor } from "../../interceptors/validation.interceptor";
import { TimeoutInterceptor } from "../../interceptors/timeout.interceptor";
import { HttpExceptionFilter } from "../../filters/http-exception.filter";

@Controller('passages')
@ApiTags('passages')
@UseInterceptors(LoggingInterceptor, ExceptionInterceptor, TimeoutInterceptor, ValidationInterceptor)
export class PassageController {
  constructor(private readonly passageService: IPassageService) { }

  @Post()
  @UseFilters(new HttpExceptionFilter())
  public async createPassage(@Body() createPassageDTO: CreatePassageDTO): Promise<Passage> {
    return await this.passageService.createPassage(createPassageDTO);
  }

  @Get(':passageId')
  @UseFilters(new HttpExceptionFilter())
  public async getPassageById(@Param() param: { passageId: number }): Promise<Passage> {
    return await this.passageService.getPassageById(Number(param.passageId));
  }

  @Get()
  @UseFilters(new HttpExceptionFilter())
  public async getAllPassages(): Promise<Array<Passage>> {
    return await this.passageService.getAllPassages();
  }

  @Put(':passageId/update')
  @UseFilters(new HttpExceptionFilter())
  public async updatePassageById(@Param() param: { passageId: number }, @Body() updateDock: CreatePassageDTO): Promise<Passage> {
    return await this.passageService.updatePassageById(Number(param.passageId), updateDock);
  }

  @Delete(':passageId/delete')
  @UseFilters(new HttpExceptionFilter())
  public async deletePassageById(@Param() param: { passageId: number }): Promise<Passage> {
    return await this.passageService.deletePassageById(Number(param.passageId));
  }
}