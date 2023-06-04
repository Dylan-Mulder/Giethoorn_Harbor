import { DeleteResult, UpdateResult } from "typeorm";
import { Passage } from "../modules/passage/entities/passage.entity";
import { CreatePassageDTO } from "../modules/passage/dto/create-passage.dto";

export abstract class IPassageService {
  abstract createPassage(dto: CreatePassageDTO): Promise<Passage>;
  abstract getPassageById(id: number): Promise<Passage>;
  abstract getAllPassages(): Promise<Array<Passage>>;
  abstract updatePassageById(id: number, dto: CreatePassageDTO): Promise<Passage>;
  abstract deletePassageById(id: number): Promise<Passage>;
}