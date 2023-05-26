import { DeleteResult } from "typeorm";
import { Dock } from "../dock/dock.model";

export abstract class IDockService {
  abstract createDock(dock: Dock): Promise<Dock>;
  abstract getDockById(id: number): Promise<Dock>;
  abstract getAllDocks(): Promise<Array<Dock>>;
  abstract updateDockById(id: number, updateDock: Dock): Promise<Dock>;
  abstract deleteDockById(id: number): Promise<DeleteResult>;
}