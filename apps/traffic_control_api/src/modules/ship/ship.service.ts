import { Injectable } from '@nestjs/common';
import { Ship } from './entities/ship.entity';
import { IShipService } from '../../interfaces/IShip.service';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateShipDTO } from './dto/create-ship.dto';
import { ShipDTO } from './dto/ship.dto';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';
import axios from 'axios';

@Injectable()
export class ShipService implements IShipService {

  private USER = this.configService.get('RABBITMQ_USER');
  private PASSWORD = this.configService.get('RABBITMQ_PASS');
  private HOST = this.configService.get('RABBITMQ_HOST');

  constructor(@InjectRepository(Ship) private readonly repo: Repository<Ship>, private readonly configService: ConfigService) { }

  public async createShip(dto: any): Promise<Ship> {
    const ship = this.repo.create(dto.data.ship);
    const returnedObject = await this.repo.save(dto.data);

    await this.sendToQueue('ship-registered', 'event.ship-registered', JSON.stringify(returnedObject));
    return returnedObject;
  }

  public async getShipById(id: number): Promise<ShipDTO> {
    return ShipDTO.fromEntity(await this.repo.findOne({ where: { id: id } }));
  }

  public async getAllShips(): Promise<Array<ShipDTO>> {
    return await this.repo.find().then((docks: Array<Ship>) => docks.map(d => ShipDTO.fromEntity(d)));
  }

  public async updateShipById(id: number, updateShip: CreateShipDTO): Promise<Ship> {
    await this.repo.update(id, updateShip)
    return await this.getShipById(id);
  }

  public async deleteShipById(id: number): Promise<Ship> {
    const obj = await this.getShipById(id);
    await this.repo.delete(id)
    return obj;
  }

  async sendToQueue(exchangeName: string, routingKey: string, message: string) {
    const connection = amqp.connect(`amqp://${this.USER}:${this.PASSWORD}@${this.HOST}`);
    const channel = connection.createChannel();
    await channel.assertExchange(exchangeName, 'topic', { durable: false });
    await channel.publish(exchangeName, routingKey, Buffer.from(message));
  };
}