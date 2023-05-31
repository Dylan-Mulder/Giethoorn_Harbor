import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateLeaseAgreementCommand } from "../impl/create-lease-agreement.command";
import { LeaseAgreement } from "../../entities/lease-agreement.entity";

@CommandHandler(CreateLeaseAgreementCommand)
export class CreateLeaseHandler implements ICommandHandler<CreateLeaseAgreementCommand> {
  constructor(@InjectRepository(LeaseAgreement) private repo: Repository<LeaseAgreement>) { }

  async execute(command: CreateLeaseAgreementCommand): Promise<any> {
    let newLease = new LeaseAgreement();
    newLease.reference = command.reference;
    newLease.dock_id = command.dock_id;
    newLease.shipping_company_id = command.shipping_company_id;
    newLease.sign_date = command.sign_date;
    newLease.price = command.price;
    const data = await this.repo.insert(newLease);
    if (data.generatedMaps) {
      console.log(newLease);
      return newLease;
    }
    else {
      console.log(newLease);
    }
  }
}