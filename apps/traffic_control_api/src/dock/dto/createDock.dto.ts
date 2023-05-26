import { IsNotEmpty } from "class-validator";

export class CreateDockDTO {

  @IsNotEmpty()
  public readonly name: string;

  @IsNotEmpty()
  public readonly description: string;

  @IsNotEmpty()
  public readonly amountOfShipSpots: number;

  @IsNotEmpty()
  public readonly amountOfTruckSpots: number;

  constructor(
    name?: string,
    description?: string,
    amountOfShipSpots?: number,
    amountOfTruckSpots?: number
  ) {
    this.name = name;
    this.description = description;
    this.amountOfShipSpots = amountOfShipSpots;
    this.amountOfTruckSpots = amountOfTruckSpots;
  }
}