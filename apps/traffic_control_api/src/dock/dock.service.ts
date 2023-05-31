import { Injectable } from '@nestjs/common';
import { IDockService } from '../interfaces/IDockService';
import { Dock } from './dock.model';
import { CreateDockDTO } from './dto/createDock.dto';
import { UpdateDockDTO } from './dto/updateDock.dto';
import { DeleteResult } from 'typeorm';

@Injectable()
export class DockService implements IDockService {

  createDock(dto: CreateDockDTO): Promise<Dock> {
    throw new Error('Method not implemented.');
  }

  getDockById(id: number): Promise<Dock> {
    throw new Error('Method not implemented.');
  }

  getAllDocks(): Promise<Array<Dock>> {
    throw new Error('Method not implemented.');
  }

  updateDockById(id: number, dto: UpdateDockDTO): Promise<Dock> {
    throw new Error('Method not implemented.');
  }

  deleteDockById(id: number): Promise<DeleteResult> {
    throw new Error('Method not implemented.');
  }
}