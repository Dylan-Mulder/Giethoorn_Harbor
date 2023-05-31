import { Ship } from "../modules/ship/entities/ship.entity";
import { CreateShipDTO } from "../modules/ship/dto/create-ship.dto";

export abstract class IShipService {
  abstract createShip(dto: CreateShipDTO): Promise<Ship>;
  abstract getShipById(id: number): Promise<Ship>;
  abstract getAllShips(): Promise<Array<Ship>>;
  abstract updateShipById(id: number, dto: CreateShipDTO): Promise<Ship>;
  abstract deleteShipById(id: number): Promise<Ship>;
  abstract dockShip(id: number): Promise<Ship>
}