import { Injectable } from '@nestjs/common';
import { ILeaseAgreementService } from '../../interfaces/ILeaseAgreement.service';
import { Repository } from 'typeorm';
import { LeaseAgreement } from './entities/lease-agreement.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LeaseAgreementDTO } from './dto/lease-agreement.dto';
import { CreateLeaseAgreementDTO } from './dto/create-lease-agreement.dto';

@Injectable()
export class LeaseAgreementService implements ILeaseAgreementService {

  constructor(@InjectRepository(LeaseAgreement) private readonly repo: Repository<LeaseAgreement>) { }

  public async getLeaseAgreementById(id: number): Promise<LeaseAgreementDTO> {
    return LeaseAgreementDTO.fromEntity(await this.repo.findOne({ where: { id: id } }));
  }

  public async getAllLeaseAgreements(): Promise<Array<LeaseAgreementDTO>> {
    return await this.repo.find().then((agreements: Array<LeaseAgreement>) => agreements.map(a => LeaseAgreementDTO.fromEntity(a)));
  }

  public async createLeaseAgreement(dto: CreateLeaseAgreementDTO): Promise<LeaseAgreement> {
    dto.sign_date = new Date(dto.sign_date);
    dto.valid_until = new Date(dto.valid_until);

    const result = this.repo.create(dto);
    const returnedObject = await this.repo.save(result);
    return returnedObject;
  }

  public async updateLeaseAgreementById(id: number, updateLeaseAgreement: CreateLeaseAgreementDTO): Promise<LeaseAgreement> {
    updateLeaseAgreement.sign_date = new Date(updateLeaseAgreement.sign_date);
    updateLeaseAgreement.valid_until = new Date(updateLeaseAgreement.valid_until);
    await this.repo.update(id, updateLeaseAgreement)
    return await this.getLeaseAgreementById(id);
  }

  public async deleteLeaseAgreementById(id: number): Promise<LeaseAgreement> {
    const obj = await this.getLeaseAgreementById(id);
    await this.repo.delete(id)
    return obj;
  }
}
