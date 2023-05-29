import { Controller, Get, Param, Post, Body, Delete, Patch } from '@nestjs/common';
import { ILeaseAgreementService } from '../../interfaces/ILeaseAgreement.service';
import { LeaseAgreement } from './lease-agreement.entity';

@Controller('lease-agreement')
export class LeaseAgreementController {
  constructor(private readonly leaseAgreementService: ILeaseAgreementService) { }

  @Post()
  async createLeaseAgreement(@Body() leaseAgreement: LeaseAgreement) {
    return await this.leaseAgreementService.createLeaseAgreement(leaseAgreement);
  }

  @Get()
  async getLeaseAgreementById(@Param() param: { leaseAgreementId: number }) {
    return await this.leaseAgreementService.getLeaseAgreementById(param.leaseAgreementId);
  }

  @Get()
  async getAllLeaseAgreements() {
    return await this.leaseAgreementService.getAllLeaseAgreements();
  }

  @Patch()
  async updateLeaseAgreementById(@Param() param: { leaseAgreementId: number }, @Body() updateLeaseAgreement: LeaseAgreement) {
    return await this.leaseAgreementService.updateLeaseAgreementById(param.leaseAgreementId, updateLeaseAgreement);
  }

  @Delete()
  async deleteLeaseAgreementById(@Param() param: { leaseAgreementId: number }) {
    return await this.leaseAgreementService.deleteLeaseAgreementById(param.leaseAgreementId);
  }
}