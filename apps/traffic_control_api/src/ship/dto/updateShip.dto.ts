import { IsNotEmpty } from "class-validator";

export class UpdateShipDTO {

  @IsNotEmpty()
  public readonly id: number;

  @IsNotEmpty()
  public readonly name: string;

  @IsNotEmpty()
  public readonly shippingCompany: string;

  @IsNotEmpty()
  public readonly grossTonnage: number;

  @IsNotEmpty()
  public readonly length: number;

  constructor(id: number, name: string, shippingCompany: string, grossTonnage: number, length: number) {
    this.id = id;
    this.name = name;
    this.shippingCompany = shippingCompany;
    this.grossTonnage = grossTonnage;
    this.length = length;
  }
}