import { Injectable } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { ClientProxyFactory, RmqOptions } from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {
  private client: any;

  async connect(): Promise<void> {
    const microserviceOptions: RmqOptions = {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://user:password@5672`],
        queue: 'Refilling-Queue',
        queueOptions: {
          durable: true,
        },
      },
    };

    this.client = ClientProxyFactory.create(microserviceOptions);
  }

  async close(): Promise<void> {
    if (this.client) {
      await this.client.close();
    }
  }

  async publishEvent(ship: any): Promise<void> {
    if (!this.client) {
      throw new Error('RabbitMQ connection not established. Call connect() before publishing events.');
    }
    await this.client.emit('event', ship).toPromise();
  }

  async connectPublishClose(ship: any): Promise<void> {
    await this.connect();
    await this.publishEvent(ship);
    await this.close();
  }
}
