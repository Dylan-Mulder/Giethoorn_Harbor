import { DeleteResult } from "typeorm";
import { Tugboat } from "../modules/tugboat/tugboat.entity";

export abstract class ITugboatService {
  abstract createTugboat(Tugboat: Tugboat): Promise<Tugboat>;
  abstract getTugboatById(id: number): Promise<Tugboat>;
  abstract getAllTugboats(): Promise<Array<Tugboat>>;
  abstract updateTugboatById(id: number, updateTugboat: Tugboat): Promise<Tugboat>;
  abstract deleteTugboatById(id: number): Promise<DeleteResult>;
}