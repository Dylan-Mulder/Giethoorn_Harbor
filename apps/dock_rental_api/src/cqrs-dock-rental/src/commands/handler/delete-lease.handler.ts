import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DeleteLeaseAgreementCommand } from "../impl/delete-lease-agreement.command";
import { LeaseAgreement } from "../../entities/lease-agreement.entity";

@CommandHandler(DeleteLeaseAgreementCommand)
export class DeleteLeaseHandler implements ICommandHandler<DeleteLeaseAgreementCommand> {
  constructor(@InjectRepository(LeaseAgreement) private repo: Repository<LeaseAgreement>) { }

  async execute(command: DeleteLeaseAgreementCommand): Promise<any> {
    const { id } = command;
    console.log(command);
    const deleted = await this.repo.delete(id);
    if (deleted.affected === 1) return { deleted: true };
  }
}