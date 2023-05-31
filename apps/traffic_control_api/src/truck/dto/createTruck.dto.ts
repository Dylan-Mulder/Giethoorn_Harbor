import { IsNotEmpty } from "class-validator";

export class CreateTruckDTO {

  @IsNotEmpty()
  public readonly name: string;

  @IsNotEmpty()
  public readonly shippingCompany: string;

  constructor(name: string, shippingCompany: string) {
    this.name = name;
    this.shippingCompany = shippingCompany;
  }
}