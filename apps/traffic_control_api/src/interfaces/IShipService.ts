import { DeleteResult } from "typeorm";
import { Ship } from "../ship/ship.model";

export abstract class IShipService {
  abstract createShip(Ship: Ship): Promise<Ship>;
  abstract getShipById(id: number): Promise<Ship>;
  abstract getAllShips(): Promise<Array<Ship>>;
  abstract updateShipById(id: number, updateShip: Ship): Promise<Ship>;
  abstract deleteShipById(id: number): Promise<DeleteResult>;
}