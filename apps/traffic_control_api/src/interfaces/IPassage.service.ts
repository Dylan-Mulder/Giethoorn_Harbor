import { DeleteResult } from "typeorm";
import { Passage } from "../modules/passage/passage.entity";

export abstract class IPassageService {
  abstract createPassage(Passage: Passage): Promise<Passage>;
  abstract getPassageById(id: number): Promise<Passage>;
  abstract getAllPassages(): Promise<Array<Passage>>;
  abstract updatePassageById(id: number, updatePassage: Passage): Promise<Passage>;
  abstract deletePassageById(id: number): Promise<DeleteResult>;
}