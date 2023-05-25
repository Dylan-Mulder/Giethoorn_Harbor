import { Injectable } from '@nestjs/common';
import { Dock } from '../models/dock.model';
import { IDockService } from '../interfaces/IDockService';

@Injectable()
export class DockService implements IDockService {
  createDock(): void {
    throw new Error('Method not implemented.');
  }
  getDockById(id: number): Dock {
    throw new Error('Method not implemented.');
  }
  getAllDocks(): Dock[] {
    throw new Error('Method not implemented.');
  }
  updateDockById(id: number, updateDock: Dock): void {
    throw new Error('Method not implemented.');
  }
  deleteDockById(id: number): void {
    throw new Error('Method not implemented.');
  }

}