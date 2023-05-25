import { Injectable } from '@nestjs/common';
import { Passage } from '../models/Passage.model';
import { IPassageService } from '../interfaces/IPassageService';

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