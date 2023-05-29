import { DeleteResult, UpdateResult } from "typeorm";
import { Dock } from "../modules/dock/entities/dock.entity";
import { DockDTO } from "../modules/dock/dto/dock.dto";

export abstract class IDockService {
  abstract createDock(dto: DockDTO): Promise<DockDTO>;
  abstract getDockById(id: number): Promise<DockDTO>;
  abstract getAllDocks(): Promise<Array<DockDTO>>;
  abstract updateDockById(id: number, dto: DockDTO): Promise<UpdateResult>;
  abstract deleteDockById(id: number): Promise<DeleteResult>;
}