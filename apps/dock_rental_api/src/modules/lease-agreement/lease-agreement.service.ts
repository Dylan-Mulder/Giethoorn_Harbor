import { Injectable } from '@nestjs/common';
import { ILeaseAgreementService } from '../../interfaces/ILeaseAgreement.service';
import { DeleteResult } from 'typeorm';
import { LeaseAgreement } from './lease-agreement.entity';

@Injectable()
export class LeaseAgreementService implements ILeaseAgreementService {

  createLeaseAgreement(leaseAgreement: LeaseAgreement): Promise<LeaseAgreement> {
    throw new Error('Method not implemented.');
  }

  getLeaseAgreementById(id: number): Promise<LeaseAgreement> {
    throw new Error('Method not implemented.');
  }

  getAllLeaseAgreements(): Promise<LeaseAgreement[]> {
    throw new Error('Method not implemented.');
  }

  updateLeaseAgreementById(id: number, updateLeaseAgreement: LeaseAgreement): Promise<LeaseAgreement> {
    throw new Error('Method not implemented.');
  }

  deleteLeaseAgreementById(id: number): Promise<DeleteResult> {
    throw new Error('Method not implemented.');
  }
}
