import { Dock } from "./dock.model";
import { Ship } from "./ship.model";
import { Truck } from "./truck.model";
import { Tugboat } from "./tugboat.model";

export class Passage {
  public id: number;
  public ship: Ship;
  public truck: Truck;
  public dock: Dock;
  public tugboats: Array<Tugboat>;
  public arrival: Date;
  public departure: Date;
}