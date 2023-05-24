import { Ship } from "./ship.model";
import { TrafficPlanning } from "./trafficPlanning.model";
import { Truck } from "./truck.model";

export class Inspection {
  id: number;
  trafficPlanning: TrafficPlanning;
  ship: Ship;
  truck: Truck;
  supervisor: string;
  scheduledFor: Date;
}