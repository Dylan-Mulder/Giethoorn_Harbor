import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeaseAgreement } from '../entities/lease-agreement.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateLeaseAgreementCommand } from '../commands/impl/create-lease-agreement.command';
import { UpdateLeaseAgreementCommand } from '../commands/impl/update-lease-agreement.command';
import { DeleteLeaseAgreementCommand } from '../commands/impl/delete-lease-agreement.command';

@Injectable()
export class LeaseAgreementRepository {

  constructor(private queryBus: QueryBus, private commandBus: CommandBus) { }

  async getAll(): Promise<Array<LeaseAgreement>> {
    return await this.queryBus.execute(new GetDrinksQuery());
  }

  async getDrinksById(id: string): Promise<LeaseAgreement> {
    return await this.queryBus.execute(new GetSingleDrinkQuery(id));
  }

  async create(payload: CreateLeaseAgreementCommand): Promise<LeaseAgreement> {
    return await this.commandBus.execute(payload);
  }

  async update(id: number, reference: string, dock_id: number, shipping_company_id: number, sign_date: Date, valid_until: Date, price: number): Promise<any> {
    return this.commandBus.execute(new UpdateLeaseAgreementCommand(id, reference, dock_id, shipping_company_id, sign_date, valid_until, price));
  }

  async delete(id: number): Promise<any> {
    return this.commandBus.execute(new DeleteLeaseAgreementCommand(id));
  }
}