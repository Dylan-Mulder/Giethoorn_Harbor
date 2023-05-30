import { Injectable } from '@nestjs/common';
import { ITruckService } from '../../interfaces/ITruck.service';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Truck } from './entities/truck.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTruckDTO } from './dto/create-truck.dto';
import { TruckDTO } from './dto/truck.dto';

@Injectable()
export class TruckService implements ITruckService {

  constructor(@InjectRepository(Truck) private readonly repo: Repository<Truck>) { }

  public async createTruck(dto: CreateTruckDTO): Promise<Truck> {
    const truck = this.repo.create(dto);
    return await this.repo.save(truck);
  }

  public async getTruckById(id: number): Promise<TruckDTO> {
    return TruckDTO.fromEntity(await this.repo.findOne({ where: { id: id } }));
  }

  public async getAllTrucks(): Promise<Array<TruckDTO>> {
    return await this.repo.find().then((trucks: Array<Truck>) => trucks.map(d => TruckDTO.fromEntity(d)));
  }

  public async updateTruckById(id: number, updateTruck: CreateTruckDTO): Promise<UpdateResult> {
    return await this.repo.update(id, updateTruck)
  }

  public async deleteTruckById(id: number): Promise<DeleteResult> {
    return await this.repo.delete(id)
  }
}