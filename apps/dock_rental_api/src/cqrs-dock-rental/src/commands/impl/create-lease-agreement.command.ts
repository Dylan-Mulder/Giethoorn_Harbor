import { ICommand } from "@nestjs/cqrs";

export class CreateLeaseAgreementCommand implements ICommand {
  constructor(
    public readonly reference: string,
    public readonly dock_id: number,
    public readonly shipping_company_id: number,
    public readonly sign_date: Date,
    public readonly valid_until: Date,
    public readonly price: number
  ) {
    this.reference = reference;
    this.dock_id = dock_id;
    this.shipping_company_id = shipping_company_id;
    this.sign_date = sign_date;
    this.valid_until = valid_until;
    this.price = price;
  }
}