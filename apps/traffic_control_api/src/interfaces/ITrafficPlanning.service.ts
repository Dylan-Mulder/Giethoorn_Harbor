import { DeleteResult, UpdateResult } from "typeorm";
import { CreateTrafficPlanningDTO } from "../modules/traffic-planning/dto/create-traffic-planning.dto";
import { TrafficPlanning } from "../modules/traffic-planning/entities/traffic-planning.entity";

export abstract class ITrafficPlanningService {
  abstract createTrafficPlanning(dto: CreateTrafficPlanningDTO): Promise<TrafficPlanning>;
  abstract getTrafficPlanningById(id: number): Promise<TrafficPlanning>;
  abstract getAllTrafficPlannings(): Promise<Array<TrafficPlanning>>;
  abstract updateTrafficPlanningById(id: number, dto: CreateTrafficPlanningDTO): Promise<TrafficPlanning>;
  abstract deleteTrafficPlanningById(id: number): Promise<TrafficPlanning>;
}