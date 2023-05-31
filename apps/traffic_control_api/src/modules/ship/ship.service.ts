import { Injectable } from '@nestjs/common';
import { Ship } from './entities/ship.entity';
import { IShipService } from '../../interfaces/IShip.service';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateShipDTO } from './dto/create-ship.dto';
import { ShipDTO } from './dto/ship.dto';

@Injectable()
export class ShipService implements IShipService {

  constructor(@InjectRepository(Ship) private readonly repo: Repository<Ship>) { }

  public async createShip(dto: CreateShipDTO): Promise<Ship> {
    const ship = this.repo.create(dto);
    return await this.repo.save(ship);
  }

  public async getShipById(id: number): Promise<ShipDTO> {
    return ShipDTO.fromEntity(await this.repo.findOne({ where: { id: id } }));
  }

  public async getAllShips(): Promise<Array<ShipDTO>> {
    return await this.repo.find().then((docks: Array<Ship>) => docks.map(d => ShipDTO.fromEntity(d)));
  }

  public async updateShipById(id: number, updateShip: CreateShipDTO): Promise<UpdateResult> {
    return await this.repo.update(id, updateShip)
  }

  public async deleteShipById(id: number): Promise<DeleteResult> {
    return await this.repo.delete(id)
  }
}