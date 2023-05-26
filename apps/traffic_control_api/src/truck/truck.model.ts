import { IsString, IsNumber } from 'class-validator';

export class Truck {

  @IsNumber()
  public id: number;

  @IsString()
  public name: string;

  @IsString()
  public shippingCompany: string;
}