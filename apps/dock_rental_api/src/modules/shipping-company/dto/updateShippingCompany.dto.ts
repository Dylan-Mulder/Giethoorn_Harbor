import { IsNotEmpty } from "class-validator";

export class CreateShippingCompanyDTO {

  @IsNotEmpty()
  public readonly id: number;

  @IsNotEmpty()
  public readonly name: string;

  @IsNotEmpty()
  public readonly kvkNumber: number;

  @IsNotEmpty()
  public readonly country: string;

  constructor(id: number, name: string, kvkNumber: number, country: string) {
    this.name = name;
    this.kvkNumber = kvkNumber;
    this.country = country;
  }
}