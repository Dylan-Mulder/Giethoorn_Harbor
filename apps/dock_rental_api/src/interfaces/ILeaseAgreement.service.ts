import { DeleteResult } from "typeorm";
import { LeaseAgreement } from "../modules/lease-agreement/lease-agreement.entity";

export abstract class ILeaseAgreementService {
  abstract createLeaseAgreement(leaseAgreement: LeaseAgreement): Promise<LeaseAgreement>;
  abstract getLeaseAgreementById(id: number): Promise<LeaseAgreement>;
  abstract getAllLeaseAgreements(): Promise<Array<LeaseAgreement>>;
  abstract updateLeaseAgreementById(id: number, updateLeaseAgreement: LeaseAgreement): Promise<LeaseAgreement>;
  abstract deleteLeaseAgreementById(id: number): Promise<DeleteResult>;
}