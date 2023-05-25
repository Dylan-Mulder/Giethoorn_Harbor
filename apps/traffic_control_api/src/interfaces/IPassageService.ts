import { Passage } from "../models/Passage.model";

export interface IPassageService {
  createPassage(Passage: Passage): void;
  getPassageById(id: number): Passage;
  getAllPassages(): Array<Passage>;
  updatePassageById(id: number, updatePassage: Passage): void;
  deletePassageById(id: number): void;
}