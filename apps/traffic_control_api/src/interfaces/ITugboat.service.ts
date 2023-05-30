import { DeleteResult, UpdateResult } from "typeorm";
import { Tugboat } from "../modules/tugboat/tugboat.entity";
import { CreateTugboatDTO } from "../modules/tugboat/dto/create-tugboat.dto";

export abstract class ITugboatService {
  abstract createTugboat(dto: CreateTugboatDTO): Promise<Tugboat>;
  abstract getTugboatById(id: number): Promise<Tugboat>;
  abstract getAllTugboats(): Promise<Array<Tugboat>>;
  abstract updateTugboatById(id: number, dto: CreateTugboatDTO): Promise<UpdateResult>;
  abstract deleteTugboatById(id: number): Promise<DeleteResult>;
}