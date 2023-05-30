import { DeleteResult, UpdateResult } from "typeorm";
import { CreateLeaseAgreementDTO } from "../modules/lease-agreement/dto/create-lease-agreement.dto";
import { LeaseAgreement } from "../modules/lease-agreement/entities/lease-agreement.entity";

export abstract class ILeaseAgreementService {
  abstract createLeaseAgreement(dto: CreateLeaseAgreementDTO): Promise<LeaseAgreement>;
  abstract getLeaseAgreementById(id: number): Promise<LeaseAgreement>;
  abstract getAllLeaseAgreements(): Promise<Array<LeaseAgreement>>;
  abstract updateLeaseAgreementById(id: number, dto: CreateLeaseAgreementDTO): Promise<UpdateResult>;
  abstract deleteLeaseAgreementById(id: number): Promise<DeleteResult>;
}