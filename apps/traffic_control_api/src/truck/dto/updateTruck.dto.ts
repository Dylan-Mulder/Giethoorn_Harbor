import { IsNotEmpty } from "class-validator";

export class UpdateTruckDTO {

  @IsNotEmpty()
  public readonly id: number;

  @IsNotEmpty()
  public readonly name: string;

  @IsNotEmpty()
  public readonly shippingCompany: string;

  constructor(id: number, name: string, shippingCompany: string) {
    this.id = id;
    this.name = name;
    this.shippingCompany = shippingCompany;
  }
}