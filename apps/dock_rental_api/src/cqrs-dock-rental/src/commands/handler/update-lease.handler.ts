import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UpdateLeaseAgreementCommand } from "../impl/update-lease-agreement.command";
import { LeaseAgreement } from "../../entities/lease-agreement.entity";

@CommandHandler(UpdateLeaseAgreementCommand)
export class UpdateLeaseHandler implements ICommandHandler<UpdateLeaseAgreementCommand> {
  constructor(@InjectRepository(LeaseAgreement) private repo: Repository<LeaseAgreement>) { }

  async execute(command: UpdateLeaseAgreementCommand): Promise<any> {
    try {
      const result = await this.repo.findOne({ where: { id: command.id } });
      let newValue = result;
      newValue.reference = command.reference;
      newValue.dock_id = command.dock_id;
      newValue.shipping_company_id = command.shipping_company_id;
      newValue.sign_date = command.sign_date;
      newValue.valid_until = command.valid_until;
      newValue.price = command.dock_id;
      const updated = await this.repo.update(command.id, newValue);
      if (updated.affected === 1) return { deleted: true };
    }
    catch (error) {
      console.log(error);
      throw error;
    }
  }
}