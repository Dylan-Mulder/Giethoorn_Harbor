import { DeleteResult } from "typeorm";
import { Ship } from "../modules/ship/ship.entity";

export abstract class IShipService {
  abstract createShip(Ship: Ship): Promise<Ship>;
  abstract getShipById(id: number): Promise<Ship>;
  abstract getAllShips(): Promise<Array<Ship>>;
  abstract updateShipById(id: number, updateShip: Ship): Promise<Ship>;
  abstract deleteShipById(id: number): Promise<DeleteResult>;
}