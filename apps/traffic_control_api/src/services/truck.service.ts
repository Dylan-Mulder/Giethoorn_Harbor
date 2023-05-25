import { Injectable } from '@nestjs/common';
import { Truck } from '../models/truck.model';
import { ITruckService } from '../interfaces/ITruckService';

@Injectable()
export class TruckService implements ITruckService {
  createTruck(): void {
    throw new Error('Method not implemented.');
  }
  getTruckById(id: number): Truck {
    throw new Error('Method not implemented.');
  }
  getAllTrucks(): Truck[] {
    throw new Error('Method not implemented.');
  }
  updateTruckById(id: number, updateTruck: Truck): void {
    throw new Error('Method not implemented.');
  }
  deleteTruckById(id: number): void {
    throw new Error('Method not implemented.');
  }
}