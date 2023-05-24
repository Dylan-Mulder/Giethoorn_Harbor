import { ship } from "./ship.model";
import { TrafficPlanning } from "./trafficPlanning.model";

export class RefillService {
  id: number;
  trafficPlanning: TrafficPlanning;
  ship: ship;
  needsRefuelling: boolean;
  needsRecharging: boolean;
}