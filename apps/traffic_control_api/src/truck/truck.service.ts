import { Injectable } from '@nestjs/common';
import { Truck } from './truck.model';
import { ITruckService } from '../interfaces/ITruckService';
import { DeleteResult } from 'typeorm';

@Injectable()
export class TruckService implements ITruckService {
  createTruck(Truck: Truck): Promise<Truck> {
    throw new Error('Method not implemented.');
  }
  getTruckById(id: number): Promise<Truck> {
    throw new Error('Method not implemented.');
  }
  getAllTrucks(): Promise<Truck[]> {
    throw new Error('Method not implemented.');
  }
  updateTruckById(id: number, updateTruck: Truck): Promise<Truck> {
    throw new Error('Method not implemented.');
  }
  deleteTruckById(id: number): Promise<DeleteResult> {
    throw new Error('Method not implemented.');
  }

}