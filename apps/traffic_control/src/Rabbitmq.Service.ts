import { Injectable } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { ClientProxy, ClientProxyFactory, RmqOptions } from '@nestjs/microservices';
import { Ship } from 'apps/refilling/models/ship.model';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class RabbitMQService {
  private client: ClientProxy;

  constructor(private readonly configService: ConfigService) {}

  async connect(): Promise<void> {
    const USER = this.configService.get('RABBITMQ_USER');
    const PASSWORD = this.configService.get('RABBITMQ_PASS');
    const HOST = this.configService.get('RABBITMQ_HOST');
    const QUEUE = this.configService.get('RABBITMQ_REFILLING_QUEUE');

    const microserviceOptions: RmqOptions = {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
        queue: QUEUE,
        queueOptions: {
          durable: true,
        },
      },
    };

    this.client = await ClientProxyFactory.create(microserviceOptions).connect();
  }

  async close(): Promise<void> {
    if (this.client) {
      await this.client.close();
    }
  }

  async publishShipCreatedEvent(ship: Ship): Promise<void> {
    if (!this.client) {
      throw new Error('RabbitMQ connection not established. Call connect() before publishing events.');
    }
    await this.client.emit('ship_created', ship);
  }

  async connectPublishClose(ship: Ship): Promise<void> {
    try {
      await this.connect();
      await this.publishShipCreatedEvent(ship);
    } catch (error) {
      console.error('Failed to connect, publish, or close RabbitMQ connection:', error);
    } finally {
      await this.close();
    }
  }
}
