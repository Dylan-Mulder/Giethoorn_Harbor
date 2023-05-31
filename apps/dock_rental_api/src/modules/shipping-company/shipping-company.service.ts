import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IShipCompanyService } from '../../interfaces/IShipCompany.service';
import { ShippingCompanyDTO } from './dto/ship-company.dto';
import { CreateShippingCompanyDTO } from './dto/create-shipping-company.dto';
import { ShippingCompany } from './entity/shipping-company.entity';
import { ConfigService } from '@nestjs/config';
import amqp from 'amqp-connection-manager';

@Injectable()
export class ShippingCompanyService implements IShipCompanyService {
  private USER = this.configService.get('RABBITMQ_USER');
  private PASSWORD = this.configService.get('RABBITMQ_PASS');
  private HOST = this.configService.get('RABBITMQ_HOST');

  constructor(@InjectRepository(ShippingCompany) private readonly repo: Repository<ShippingCompany>, private readonly configService: ConfigService) { }

  public async getShipCompanyById(id: number): Promise<ShippingCompanyDTO> {
    return ShippingCompanyDTO.fromEntity(await this.repo.findOne({ where: { id: id } }));
  }

  public async getAllShipCompanies(): Promise<Array<ShippingCompanyDTO>> {
    return await this.repo.find().then((docks: Array<ShippingCompany>) => docks.map(d => ShippingCompanyDTO.fromEntity(d)));
  }

  public async createShipCompany(dto: CreateShippingCompanyDTO): Promise<ShippingCompany> {
    const shipCompany = this.repo.create(dto);
    const returnedObject = await this.repo.save(shipCompany);
    await this.sendToQueue('shipping-company-created', 'event.shipping-company-created', JSON.stringify(returnedObject));
    return returnedObject
  }

  public async updateShipCompanyById(id: number, updateShipCompany: CreateShippingCompanyDTO): Promise<ShippingCompany> {
    await this.repo.update(id, updateShipCompany)
    return await this.getShipCompanyById(id);
  }

  public async deleteShipCompanyById(id: number): Promise<ShippingCompany> {
    const obj = await this.getShipCompanyById(id);
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
