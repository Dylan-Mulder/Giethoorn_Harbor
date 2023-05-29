import { IsNotEmpty } from "class-validator";
import { Dock } from "../../dock/dock.entity";
import { Ship } from "../../ship/ship.entity";
import { Truck } from "../../truck/truck.entity";
import { Tugboat } from "../../tugboat/tugboat.entity";

export class UpdatePassageDTO {

  @IsNotEmpty()
  public readonly id: number

  @IsNotEmpty()
  public readonly ship: Ship;

  @IsNotEmpty()
  public readonly truck: Truck;

  @IsNotEmpty()
  public readonly dock: Dock;

  @IsNotEmpty()
  public readonly tugboats: Array<Tugboat>;

  @IsNotEmpty()
  public readonly arrival: Date;

  @IsNotEmpty()
  public readonly departure: Date;

  constructor(id: number, ship: Ship, truck: Truck, dock: Dock, tugboats: Array<Tugboat>, arrival: Date, departure: Date) {
    this.id = id;
    this.ship = ship;
    this.truck = truck;
    this.dock = dock;
    this.tugboats = tugboats;
    this.arrival = arrival;
    this.departure = departure;
  }
}