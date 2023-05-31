import { Injectable } from '@nestjs/common';
import { Tugboat } from './tugboat.model';
import { ITugboatService } from '../interfaces/ITugboatService';
import { DeleteResult } from 'typeorm';

@Injectable()
export class TugboatService implements ITugboatService {
  createTugboat(Tugboat: Tugboat): Promise<Tugboat> {
    throw new Error('Method not implemented.');
  }
  getTugboatById(id: number): Promise<Tugboat> {
    throw new Error('Method not implemented.');
  }
  getAllTugboats(): Promise<Tugboat[]> {
    throw new Error('Method not implemented.');
  }
  updateTugboatById(id: number, updateTugboat: Tugboat): Promise<Tugboat> {
    throw new Error('Method not implemented.');
  }
  deleteTugboatById(id: number): Promise<DeleteResult> {
    throw new Error('Method not implemented.');
  }

}