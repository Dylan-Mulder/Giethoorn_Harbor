import { IsNotEmpty } from "class-validator";

export class CreateShipDTO {

  @IsNotEmpty()
  public readonly name: string;

  @IsNotEmpty()
  public readonly shippingCompany: string;

  @IsNotEmpty()
  public readonly grossTonnage: number;

  @IsNotEmpty()
  public readonly length: number;

  constructor(name: string, shippingCompany: string, grossTonnage: number, length: number) {
    this.name = name;
    this.shippingCompany = shippingCompany;
    this.grossTonnage = grossTonnage;
    this.length = length;
  }
}