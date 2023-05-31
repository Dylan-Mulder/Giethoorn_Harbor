import { Controller, Get, Param, Post, Body, Delete, Put, UseInterceptors } from '@nestjs/common';
import { ILeaseAgreementService } from '../../interfaces/ILeaseAgreement.service';
import { LeaseAgreement } from './entities/lease-agreement.entity';
import { CreateLeaseAgreementDTO } from './dto/create-lease-agreement.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoggingInterceptor } from '../../interceptors/logging.interceptor';
import { ExceptionInterceptor } from '../../interceptors/exception.interceptor';
import { TimeoutInterceptor } from '../../interceptors/timeout.interceptor';
import { ValidationInterceptor } from '../../interceptors/validation.interceptor';

@Controller('lease-agreements')
@ApiTags('lease-agreements')
@UseInterceptors(LoggingInterceptor, ExceptionInterceptor, TimeoutInterceptor, ValidationInterceptor)
export class LeaseAgreementController {
  constructor(private readonly leaseAgreementService: ILeaseAgreementService) { }

  @Post()
  public async createLeaseAgreement(@Body() createLeaseAgreementDTO: CreateLeaseAgreementDTO): Promise<LeaseAgreement> {
    return await this.leaseAgreementService.createLeaseAgreement(createLeaseAgreementDTO);
  }

  @Get(':leaseAgreementId')
  public async getLeaseAgreementById(@Param() param: { leaseAgreementId: number }): Promise<LeaseAgreement> {
    return await this.leaseAgreementService.getLeaseAgreementById(param.leaseAgreementId);
  }

  @Get()
  public async getAllLeaseAgreements(): Promise<Array<LeaseAgreement>> {
    return await this.leaseAgreementService.getAllLeaseAgreements();
  }

  @Put(':leaseAgreementId/update')
  public async updateLeaseAgreementById(@Param() param: { leaseAgreementId: number }, @Body() updateLeaseAgreement: CreateLeaseAgreementDTO): Promise<LeaseAgreement> {
    return await this.leaseAgreementService.updateLeaseAgreementById(param.leaseAgreementId, updateLeaseAgreement);
  }

  @Delete(':leaseAgreementId/delete')
  public async deleteLeaseAgreementById(@Param() param: { leaseAgreementId: number }): Promise<LeaseAgreement> {
    return await this.leaseAgreementService.deleteLeaseAgreementById(param.leaseAgreementId);
  }
}