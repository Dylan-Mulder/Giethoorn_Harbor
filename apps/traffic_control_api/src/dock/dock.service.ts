import { Injectable } from '@nestjs/common';
import { IDockService } from '../interfaces/IDockService';
import { Dock } from './dock.model';
import { CreateDockDTO } from './dto/createDock.dto';
import { UpdateDockDTO } from './dto/updateDock.dto';
import { DeleteResult } from 'typeorm';

@Injectable()
export class DockService implements IDockService {
  async createDock(dto: CreateDockDTO): Promise<Dock> {
    throw new Error('Method not implemented.');
  }

  async getDockById(id: number): Promise<Dock> {
    throw new Error('Method not implemented.');
  }

  async getAllDocks(): Promise<Array<Dock>> {
    throw new Error('Method not implemented.');
  }

  async updateDockById(id: number, dto: UpdateDockDTO): Promise<Dock> {
    throw new Error('Method not implemented.');
  }

  async deleteDockById(id: number): Promise<DeleteResult> {
    throw new Error('Method not implemented.');
  }
}