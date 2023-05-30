import { Injectable } from '@nestjs/common';
import { RabbitMQService } from './Rabbitmq.Service';

@Injectable()
export class TrafficControlService {
  constructor(private readonly rabbitmqService: RabbitMQService) {}

  async createShip(ship: any): Promise<void> {
    try {
      await this.rabbitmqService.sendToQueue('ship_created',ship);
    } catch (error) {
      console.error('Error creating new ship:', error);
    } finally {
      await this.rabbitmqService.close();
    }
  }
}
