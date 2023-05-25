export class CreateDockDTO {
  public id: number;
  public name: string;
  public description: string;
  public amountOfShipSpots: number;
  public amountOfTruckSpots: number;

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