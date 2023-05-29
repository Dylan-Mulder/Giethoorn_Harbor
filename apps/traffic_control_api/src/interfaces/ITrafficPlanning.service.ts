import { DeleteResult } from "typeorm";
import { TrafficPlanning } from "../modules/traffic-planning/trafficPlanning.entity";

export abstract class ITrafficPlanningService {
  abstract createTrafficPlanning(TrafficPlanning: TrafficPlanning): Promise<TrafficPlanning>;
  abstract getTrafficPlanningById(id: number): Promise<TrafficPlanning>;
  abstract getAllTrafficPlannings(): Promise<Array<TrafficPlanning>>;
  abstract updateTrafficPlanningById(id: number, updateTrafficPlanning: TrafficPlanning): Promise<TrafficPlanning>;
  abstract deleteTrafficPlanningById(id: number): Promise<DeleteResult>;
}