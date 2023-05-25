import { Injectable } from '@nestjs/common';
import { TrafficPlanning } from '../models/TrafficPlanning.model';
import { ITrafficPlanningService } from '../interfaces/ITrafficPlanning';

@Injectable()
export class TrafficPlanningService implements ITrafficPlanningService {
  createTrafficPlanning(): void {
    throw new Error('Method not implemented.');
  }
  getTrafficPlanningById(id: number): TrafficPlanning {
    throw new Error('Method not implemented.');
  }
  getAllTrafficPlannings(): TrafficPlanning[] {
    throw new Error('Method not implemented.');
  }
  updateTrafficPlanningById(id: number, updateTrafficPlanning: TrafficPlanning): void {
    throw new Error('Method not implemented.');
  }
  deleteTrafficPlanningById(id: number): void {
    throw new Error('Method not implemented.');
  }
}