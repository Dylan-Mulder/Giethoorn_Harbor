import { Controller, Get, Param, Post, Body, Delete, Put, UseInterceptors, UseFilters } from '@nestjs/common';
import { ITugboatService } from '../../interfaces/ITugboat.service';
import { Tugboat } from './entities/tugboat.entity';
import { CreateTugboatDTO } from './dto/create-tugboat.dto';
import { ApiTags } from '@nestjs/swagger';
import { ExceptionInterceptor } from '../../interceptors/exception.interceptor';
import { LoggingInterceptor } from '../../interceptors/logging.interceptor';
import { TimeoutInterceptor } from '../../interceptors/timeout.interceptor';
import { ValidationInterceptor } from '../../interceptors/validation.interceptor';
import { HttpExceptionFilter } from '../../filters/http-exception.filter';

@Controller('tugboats')
@ApiTags('tugboats')
@UseInterceptors(LoggingInterceptor, ExceptionInterceptor, TimeoutInterceptor, ValidationInterceptor)
export class TugboatController {
  constructor(private readonly tugboatService: ITugboatService) { }

  @Post()
  @UseFilters(new HttpExceptionFilter())
  async createTugboat(@Body() createTugboatDTO: CreateTugboatDTO): Promise<Tugboat> {
    return await this.tugboatService.createTugboat(createTugboatDTO);
  }

  @Get(':tugboatId')
  @UseFilters(new HttpExceptionFilter())
  async getTugboatById(@Param() param: { tugboatId: number }): Promise<Tugboat> {
    return await this.tugboatService.getTugboatById(param.tugboatId);
  }

  @Get()
  @UseFilters(new HttpExceptionFilter())
  async getAllTugboats(): Promise<Array<Tugboat>> {
    return await this.tugboatService.getAllTugboats();
  }

  @Put(':tugboatId/update')
  @UseFilters(new HttpExceptionFilter())
  async updateTugboatById(@Param() param: { tugboatId: number }, @Body() updateTugboat: CreateTugboatDTO): Promise<Tugboat> {
    return await this.tugboatService.updateTugboatById(param.tugboatId, updateTugboat);
  }

  @Delete(':tugboatId/delete')
  @UseFilters(new HttpExceptionFilter())
  async deleteTugboat(@Param() param: { tugboatId: number }): Promise<Tugboat> {
    return await this.tugboatService.deleteTugboatById(param.tugboatId);
  }
}