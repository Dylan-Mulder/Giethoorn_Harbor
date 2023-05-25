import { Injectable } from '@nestjs/common';
import { Ship } from './ship.model';
import { IShipService } from '../../interfaces/IShipService';

@Injectable()
export class ShipService implements IShipService {
  createShip(): void {
    throw new Error('Method not implemented.');
  }
  getShipById(id: number): Ship {
    throw new Error('Method not implemented.');
  }
  getAllShips(): Ship[] {
    throw new Error('Method not implemented.');
  }
  updateShipById(id: number, updateShip: Ship): void {
    throw new Error('Method not implemented.');
  }
  deleteShipById(id: number): void {
    throw new Error('Method not implemented.');
  }
}