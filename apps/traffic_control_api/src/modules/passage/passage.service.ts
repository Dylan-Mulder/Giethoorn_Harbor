import { Injectable } from '@nestjs/common';
import { Passage } from './passage.entity';
import { IPassageService } from '../../interfaces/IPassage.service';
import { DeleteResult } from 'typeorm';

@Injectable()
export class PassageService implements IPassageService {
  createPassage(Passage: Passage): Promise<Passage> {
    throw new Error('Method not implemented.');
  }
  getPassageById(id: number): Promise<Passage> {
    throw new Error('Method not implemented.');
  }
  getAllPassages(): Promise<Passage[]> {
    throw new Error('Method not implemented.');
  }
  updatePassageById(id: number, updatePassage: Passage): Promise<Passage> {
    throw new Error('Method not implemented.');
  }
  deletePassageById(id: number): Promise<DeleteResult> {
    throw new Error('Method not implemented.');
  }

}