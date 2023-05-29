import { Injectable } from '@nestjs/common';
import { Ship } from './ship.entity';
import { IShipService } from '../../interfaces/IShip.service';
import { DeleteResult } from 'typeorm';

@Injectable()
export class ShipService implements IShipService {
  createShip(Ship: Ship): Promise<Ship> {
    throw new Error('Method not implemented.');
  }
  getShipById(id: number): Promise<Ship> {
    throw new Error('Method not implemented.');
  }
  getAllShips(): Promise<Ship[]> {
    throw new Error('Method not implemented.');
  }
  updateShipById(id: number, updateShip: Ship): Promise<Ship> {
    throw new Error('Method not implemented.');
  }
  deleteShipById(id: number): Promise<DeleteResult> {
    throw new Error('Method not implemented.');
  }

}