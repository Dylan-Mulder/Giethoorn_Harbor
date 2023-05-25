import { Injectable } from '@nestjs/common';
import { IPassageService } from '../interfaces/IPassageService';
import { Passage } from '../models/passage.model';

@Injectable()
export class PassageService implements IPassageService {
  createPassage(): void {
    throw new Error('Method not implemented.');
  }
  getPassageById(id: number): Passage {
    throw new Error('Method not implemented.');
  }
  getAllPassages(): Passage[] {
    throw new Error('Method not implemented.');
  }
  updatePassageById(id: number, updatePassage: Passage): void {
    throw new Error('Method not implemented.');
  }
  deletePassageById(id: number): void {
    throw new Error('Method not implemented.');
  }

}