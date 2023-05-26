import { DeleteResult } from "typeorm";
import { Dock } from "../dock/dock.model";

export interface IDockService {
  createDock(dock: Dock): Promise<Dock>;
  getDockById(id: number): Promise<Dock>;
  getAllDocks(): Promise<Array<Dock>>;
  updateDockById(id: number, updateDock: Dock): Promise<Dock>;
  deleteDockById(id: number): Promise<DeleteResult>;
}