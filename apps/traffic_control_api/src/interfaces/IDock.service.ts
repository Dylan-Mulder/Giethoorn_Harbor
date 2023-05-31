import { Dock } from "../modules/dock/entities/dock.entity";
import { CreateDockDTO } from "../modules/dock/dto/create-dock.dto";

export abstract class IDockService {
  abstract createDock(dto: CreateDockDTO): Promise<Dock>;
  abstract getDockById(id: number): Promise<Dock>;
  abstract getAllDocks(): Promise<Array<Dock>>;
  abstract updateDockById(id: number, dto: CreateDockDTO): Promise<Dock>;
  abstract deleteDockById(id: number): Promise<Dock>;
}