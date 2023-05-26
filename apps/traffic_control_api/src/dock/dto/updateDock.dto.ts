import { IsNotEmpty } from "class-validator";

export class UpdateDockDTO {

  @IsNotEmpty()
  public readonly id: number;

  @IsNotEmpty()
  public readonly name: string;

  @IsNotEmpty()
  public readonly description: string;

  @IsNotEmpty()
  public readonly amountOfShipSpots: number;

  @IsNotEmpty()
  public readonly amountOfTruckSpots: number;

  constructor(
    id: number,
    name?: string,
    description?: string,
    amountOfShipSpots?: number,
    amountOfTruckSpots?: number
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.amountOfShipSpots = amountOfShipSpots;
    this.amountOfTruckSpots = amountOfTruckSpots;
  }
}