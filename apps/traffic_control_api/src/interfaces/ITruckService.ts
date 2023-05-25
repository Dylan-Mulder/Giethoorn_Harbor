import { Truck } from "../models/truck.model";

export interface ITruckService {
  createTruck(Truck: Truck): void;
  getTruckById(id: number): Truck;
  getAllTrucks(): Array<Truck>;
  updateTruckById(id: number, updateTruck: Truck): void;
  deleteTruckById(id: number): void;
}