import { ICommand } from "@nestjs/cqrs";

export class ReadLeaseAgreementCommand implements ICommand {
  constructor(public readonly id: number) { }
}