import { DeleteResult, UpdateResult } from "typeorm";
import { CreateTugboatDTO } from "../modules/tugboat/dto/create-tugboat.dto";
import { Tugboat } from "../modules/tugboat/entities/tugboat.entity";

export abstract class ITugboatService {
  abstract createTugboat(dto: CreateTugboatDTO): Promise<Tugboat>;
  abstract getTugboatById(id: number): Promise<Tugboat>;
  abstract getAllTugboats(): Promise<Array<Tugboat>>;
  abstract updateTugboatById(id: number, dto: CreateTugboatDTO): Promise<UpdateResult>;
  abstract deleteTugboatById(id: number): Promise<DeleteResult>;
}