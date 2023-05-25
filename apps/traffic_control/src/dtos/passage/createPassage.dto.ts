import { Ship } from "apps/security/models/ship.model";
import { Truck } from "apps/security/models/truck.model";
import { Dock } from "apps/traffic_control_api/src/models/dock.model";
import { Tugboat } from "apps/traffic_control_api/src/models/tugboat.model";

export class CreatePassageDTO {
  public ship: Ship;
  public truck: Truck;
  public dock: Dock;
  public tugboats: Array<Tugboat>;
  public arrival: Date;
  public departure: Date;

  constructor(ship: Ship, truck: Truck, dock: Dock, tugboats: Array<Tugboat>, arrival: Date, departure: Date) {
    this.ship = ship;
    this.truck = truck;
    this.dock = dock;
    this.tugboats = tugboats;
    this.arrival = arrival;
    this.departure = departure;
  }
}