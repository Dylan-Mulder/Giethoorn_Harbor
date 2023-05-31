import { ICommand } from "@nestjs/cqrs";

export class DeleteLeaseAgreementCommand implements ICommand {
  constructor(public readonly id: number) { }
}