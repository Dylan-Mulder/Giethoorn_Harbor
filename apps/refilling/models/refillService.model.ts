import { Ship } from "./ship.model";
import { TrafficPlanning } from "./trafficPlanning.model";

export class RefillService {
  id: number;
  trafficPlanning: TrafficPlanning;
  ship: Ship;
  needsRefuelling: boolean;
  needsRecharging: boolean;
}