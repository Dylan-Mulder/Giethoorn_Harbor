import { DeleteResult } from "typeorm";
import { Truck } from "../truck/truck.model";

export abstract class ITruckService {
  abstract createTruck(Truck: Truck): Promise<Truck>;
  abstract getTruckById(id: number): Promise<Truck>;
  abstract getAllTrucks(): Promise<Array<Truck>>;
  abstract updateTruckById(id: number, updateTruck: Truck): Promise<Truck>;
  abstract deleteTruckById(id: number): Promise<DeleteResult>;
}