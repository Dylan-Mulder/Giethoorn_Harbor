import { TrafficPlanning } from "../models/trafficPlanning.model";

export interface ITrafficPlanningService {
  createTrafficPlanning(TrafficPlanning: TrafficPlanning): void;
  getTrafficPlanningById(id: number): TrafficPlanning;
  getAllTrafficPlannings(): Array<TrafficPlanning>;
  updateTrafficPlanningById(id: number, updateTrafficPlanning: TrafficPlanning): void;
  deleteTrafficPlanningById(id: number): void;
}