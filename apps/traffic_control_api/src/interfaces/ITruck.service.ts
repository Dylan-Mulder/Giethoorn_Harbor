import { DeleteResult, UpdateResult } from "typeorm";
import { CreateTruckDTO } from "../modules/truck/dto/create-truck.dto";
import { Truck } from "../modules/truck/entities/truck.entity";

export abstract class ITruckService {
  abstract createTruck(dto: CreateTruckDTO): Promise<Truck>;
  abstract getTruckById(id: number): Promise<Truck>;
  abstract getAllTrucks(): Promise<Array<Truck>>;
  abstract updateTruckById(id: number, dto: CreateTruckDTO): Promise<Truck>;
  abstract deleteTruckById(id: number): Promise<Truck>;
}