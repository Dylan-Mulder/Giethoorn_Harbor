import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IDockService } from '../../interfaces/IDock.service';
import { DockDTO } from './dto/dock.dto';
import { CreateDockDTO } from './dto/create-dock.dto';
import { Dock } from './entities/dock.entity';
import { ConfigService } from '@nestjs/config';
import amqp from 'amqp-connection-manager';


@Injectable()
export class DockService implements IDockService {
  private USER;
  private PASSWORD;
  private HOST;

  constructor(@InjectRepository(Dock) private readonly repo: Repository<Dock>, private readonly configService: ConfigService) {
    this.USER = configService.get('RABBITMQ_USER');
    this.PASSWORD = this.configService.get('RABBITMQ_PASS');
    this.HOST = this.configService.get('RABBITMQ_HOST');
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
    this.sendToQueue('dock-created', 'event.dock-created', JSON.stringify(returnedObject));
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

  async sendToQueue(exchangeName: string, routingKey: string, message: string) {
    const connection = await amqp.connect(`amqp://${this.USER}:${this.PASSWORD}@${this.HOST}`);
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, 'topic', { durable: false });
    await channel.publish(exchangeName, routingKey, Buffer.from(message));
  };
}