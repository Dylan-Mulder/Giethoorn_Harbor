import { ICommand } from "@nestjs/cqrs";

export class UpdateLeaseAgreementCommand implements ICommand {
  constructor(
    public readonly id: number,
    public readonly reference: string,
    public readonly dock_id: number,
    public readonly shipping_company_id: number,
    public readonly sign_date: Date,
    public readonly valid_until: Date,
    public readonly price: number
  ) { }
}