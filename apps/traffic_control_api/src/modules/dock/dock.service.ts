import { Injectable } from '@nestjs/common';
import { IDockService } from '../../interfaces/IDock.service';
import { Dock } from './entities/dock.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateDockDTO } from './dto/create-dock.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DockDTO } from './dto/dock.dto';

@Injectable()
export class DockService implements IDockService {

  constructor(@InjectRepository(Dock) private readonly repo: Repository<Dock>) { }

  public async createDock(dto: CreateDockDTO): Promise<Dock> {
    const dock = this.repo.create(dto);
    return await this.repo.save(dock);
  }

  public async getDockById(id: number): Promise<DockDTO> {
    return DockDTO.fromEntity(await this.repo.findOne({ where: { id: id } }));
  }

  public async getAllDocks(): Promise<Array<DockDTO>> {
    return await this.repo.find().then((docks: Array<Dock>) => docks.map(d => DockDTO.fromEntity(d)));
  }

  public async updateDockById(id: number, updateDock: CreateDockDTO): Promise<UpdateResult> {
    return await this.repo.update(id, updateDock)
  }

  public async deleteDockById(id: number): Promise<DeleteResult> {
    return await this.repo.delete(id)
  }
}