import { IsString, IsNumber } from 'class-validator';

export class Ship {
  @IsNumber()
  public id: number;

  @IsString()
  public name: string;

  @IsString()
  public shippingCompany: string;

  @IsNumber()
  public grossTonnage: number;

  @IsNumber()
  public length: number;
}