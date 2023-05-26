import { Injectable } from '@nestjs/common';
import { Tugboat } from './tugboat.model';
import { ITugboatService } from '../interfaces/ITugboatService';

@Injectable()
export class TugboatService implements ITugboatService {
  createTugboat(): void {
    throw new Error('Method not implemented.');
  }
  getTugboatById(id: number): Tugboat {
    throw new Error('Method not implemented.');
  }
  getAllTugboats(): Tugboat[] {
    throw new Error('Method not implemented.');
  }
  updateTugboatById(id: number, updateTugboat: Tugboat): void {
    throw new Error('Method not implemented.');
  }
  deleteTugboatById(id: number): void {
    throw new Error('Method not implemented.');
  }
}