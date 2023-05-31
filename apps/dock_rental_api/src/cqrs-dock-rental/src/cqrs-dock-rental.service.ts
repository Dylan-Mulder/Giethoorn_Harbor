import { Injectable } from "@nestjs/common";
import { QueryBus, CommandBus } from "@nestjs/cqrs";
import { CreateLeaseAgreementCommand } from "./commands/impl/create-lease-agreement.command";
import { DeleteLeaseAgreementCommand } from "./commands/impl/delete-lease-agreement.command";
import { UpdateLeaseAgreementCommand } from "./commands/impl/update-lease-agreement.command";
import { LeaseAgreement } from "./entities/lease-agreement.entity";
import { GetSingleLeaseQuery } from "./queries/impl/get-lease-agreement.query";
import { GetAllLeaseQuery } from "./queries/impl/get-lease-agreements.query";

@Injectable()
export class LeaseAgreementService {

  constructor(private queryBus: QueryBus, private commandBus: CommandBus) { }

  async getAll(): Promise<Array<LeaseAgreement>> {
    return await this.queryBus.execute(new GetAllLeaseQuery());
  }

  async getDrinksById(id: number): Promise<LeaseAgreement> {
    return await this.queryBus.execute(new GetSingleLeaseQuery(id));
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
