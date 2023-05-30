import { Controller, Get, Param, Post, Body, Delete, Put } from '@nestjs/common';
import { ILeaseAgreementService } from '../../interfaces/ILeaseAgreement.service';
import { LeaseAgreement } from './entities/lease-agreement.entity';
import { UpdateResult, DeleteResult } from 'typeorm';
import { LeaseAgreementDTO } from './dto/lease-agreement.dto';

@Controller('lease-agreements')
export class LeaseAgreementController {
  constructor(private readonly leaseAgreementService: ILeaseAgreementService) { }

  @Post()
  public async createLeaseAgreement(@Body() leaseAgreement: LeaseAgreementDTO): Promise<LeaseAgreementDTO> {
    return await this.leaseAgreementService.createLeaseAgreement(leaseAgreement);
  }

  @Get(':leaseAgreementId')
  public async getLeaseAgreementById(@Param() param: { leaseAgreementId: number }): Promise<LeaseAgreementDTO> {
    return await this.leaseAgreementService.getLeaseAgreementById(param.leaseAgreementId);
  }

  @Get()
  public async getAllLeaseAgreements(): Promise<Array<LeaseAgreementDTO>> {
    return await this.leaseAgreementService.getAllLeaseAgreements();
  }

  @Put(':leaseAgreementId/update')
  public async updateLeaseAgreementById(@Param() param: { leaseAgreementId: number }, @Body() updateLeaseAgreement: LeaseAgreementDTO): Promise<UpdateResult> {
    return await this.leaseAgreementService.updateLeaseAgreementById(param.leaseAgreementId, updateLeaseAgreement);
  }

  @Delete(':leaseAgreementId/delete')
  public async deleteLeaseAgreementById(@Param() param: { leaseAgreementId: number }): Promise<DeleteResult> {
    return await this.leaseAgreementService.deleteLeaseAgreementById(param.leaseAgreementId);
  }
}