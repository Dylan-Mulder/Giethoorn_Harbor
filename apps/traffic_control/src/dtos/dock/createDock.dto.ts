export class CreateDockDTO {
  public name: string;
  public description: string;
  public amountOfShipSpots: number;
  public amountOfTruckSpots: number;

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