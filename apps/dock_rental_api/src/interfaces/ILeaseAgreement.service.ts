import { DeleteResult, UpdateResult } from "typeorm";
import { LeaseAgreement } from "../modules/lease-agreement/entities/lease-agreement.entity";
import { LeaseAgreementDTO } from "../modules/lease-agreement/dto/lease-agreement.dto";

export abstract class ILeaseAgreementService {
  abstract createLeaseAgreement(leaseAgreement: LeaseAgreement): Promise<LeaseAgreementDTO>;
  abstract getLeaseAgreementById(id: number): Promise<LeaseAgreementDTO>;
  abstract getAllLeaseAgreements(): Promise<Array<LeaseAgreementDTO>>;
  abstract updateLeaseAgreementById(id: number, updateLeaseAgreement: LeaseAgreement): Promise<UpdateResult>;
  abstract deleteLeaseAgreementById(id: number): Promise<DeleteResult>;
}