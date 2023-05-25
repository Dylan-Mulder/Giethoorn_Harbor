import { Ship } from "apps/security/models/ship.model";
import { Truck } from "apps/security/models/truck.model";
import { Dock } from "apps/traffic_control_api/src/models/dock.model";
import { Tugboat } from "apps/traffic_control_api/src/tugboat/tugboat.model";

export class CreatePassageDTO {
  public id: number;
  public ship: Ship;
  public truck: Truck;
  public dock: Dock;
  public tugboats: Array<Tugboat>;
  public arrival: Date;
  public departure: Date;

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