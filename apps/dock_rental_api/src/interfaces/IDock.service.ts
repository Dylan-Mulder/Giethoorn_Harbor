import { DeleteResult } from "typeorm";
import { Dock } from "../modules/dock/dock.entity";
import { DockDTO } from "../modules/dock/dock.dto";

export abstract class IDockService {
  abstract createDock(dto: DockDTO): Promise<DockDTO>;
  abstract getDockById(id: number): Promise<Dock>;
  abstract getAllDocks(): Promise<Array<DockDTO>>;
  abstract updateDockById(id: number, dto: DockDTO): Promise<DockDTO>;
  abstract deleteDockById(id: number): Promise<DeleteResult>;
}