import { Dock } from "./dock.model";
import { Ship } from "./ship.model";
import { Truck } from "./truck.model";
import { Tugboat } from "./tugboat.model";

export class Passage {
  id: number;
  ship: Ship;
  truck: Truck;
  dock: Dock;
  tugboats: Array<Tugboat>;
  arrival: Date;
  departure: Date;
}