import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository, DeleteResult } from 'typeorm';
import { IDockService } from '../../interfaces/IDock.service';
import { Dock } from './dock.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DockDTO } from './dock.dto';


@Injectable()
export class DockService implements IDockService {

  constructor(@InjectRepository(Dock) private readonly repo: Repository<Dock>) { }

  public async createDock(dto: DockDTO): Promise<DockDTO> {
    return await this.repo.save(dto.toEntity()).then(d => DockDTO.fromEntity(d));
  }

  public async getDockById(id: number): Promise<Dock> {
    const dock = await this.repo.findOne(Dock[id]);
    if (dock) {
      return dock;
    }
    throw new HttpException('Dock not found', HttpStatus.NOT_FOUND)
  }

  public async getAllDocks(): Promise<Array<DockDTO>> {
    return await this.repo.find().then(docks => docks.map(d => DockDTO.fromEntity(d)));
  }

  updateDockById(id: number, updateDock: DockDTO): Promise<DockDTO> {
    throw new Error('Method not implemented.');
  }

  deleteDockById(id: number): Promise<DeleteResult> {
    throw new Error('Method not implemented.');
  }
}