import { IsString, IsNumber } from 'class-validator';

export class Dock {
  @IsNumber()
  public id: number;

  @IsString()
  public name: string;

  @IsString()
  public description: string;

  @IsNumber()
  public amountOfShipSpots: number;

  @IsNumber()
  public amountOfTruckSpots: number;
}