import { Injectable } from '@nestjs/common';
import { ITugboatService } from '../../interfaces/ITugboat.service';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Tugboat } from './entities/tugboat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTugboatDTO } from './dto/create-tugboat.dto';
import { TugboatDTO } from './dto/tugboat.dto';

@Injectable()
export class TugboatService implements ITugboatService {

  constructor(@InjectRepository(Tugboat) private readonly repo: Repository<Tugboat>) { }

  public async createTugboat(dto: CreateTugboatDTO): Promise<Tugboat> {
    const tugboat = this.repo.create(dto);
    return await this.repo.save(tugboat);
  }

  public async getTugboatById(id: number): Promise<TugboatDTO> {
    return TugboatDTO.fromEntity(await this.repo.findOne({ where: { id: id } }));
  }

  public async getAllTugboats(): Promise<Array<TugboatDTO>> {
    return await this.repo.find().then((tugs: Array<Tugboat>) => tugs.map(d => TugboatDTO.fromEntity(d)));
  }

  public async updateTugboatById(id: number, dto: CreateTugboatDTO): Promise<Tugboat> {
    await this.repo.update(id, dto)
    return await this.getTugboatById(id);
  }

  public async deleteTugboatById(id: number): Promise<Tugboat> {
    const obj = await this.getTugboatById(id);
    await this.repo.delete(id);
    return obj;
  }
}