import { Dock } from "../models/dock.model";

export interface IDockService {
  createDock(dock: Dock): void;
  getDockById(id: number): Dock;
  getAllDocks(): Array<Dock>;
  updateDockById(id: number, updateDock: Dock): void;
  deleteDockById(id: number): void;
}