import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IDockService } from '../../interfaces/IDock.service';
import { DockDTO } from './dto/dock.dto';
import { CreateDockDTO } from './dto/create-dock.dto';
import { Dock } from './entities/dock.entity';


@Injectable()
export class DockService implements IDockService {

  constructor(@InjectRepository(Dock) private readonly repo: Repository<Dock>) {
  }

  public async getDockById(id: number): Promise<DockDTO> {
    return DockDTO.fromEntity(await this.repo.findOne({ where: { id: id } }));
  }

  public async getAllDocks(): Promise<Array<DockDTO>> {
    return await this.repo.find().then((docks: Array<Dock>) => docks.map(d => DockDTO.fromEntity(d)));
  }

  public async createDock(dto: CreateDockDTO): Promise<Dock> {
    const dock = this.repo.create(dto);
    const returnedObject = await this.repo.save(dock);
    return returnedObject
  }

  public async updateDockById(id: number, updateDock: CreateDockDTO): Promise<Dock> {
    await this.repo.update(id, updateDock);
    return await this.getDockById(id);
  }

  public async deleteDockById(id: number): Promise<Dock> {
    const obj = await this.getDockById(id);
    await this.repo.delete(id);
    return obj;
  }
}