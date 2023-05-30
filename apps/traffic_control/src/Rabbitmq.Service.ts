import { Injectable } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { ClientProxy, ClientProxyFactory, RmqOptions } from '@nestjs/microservices';
import { Ship } from 'apps/refilling/models/ship.model';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService {
  private client: ClientProxy;

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


  async sendToQueue(cmd: string, data: Ship) {
    const connection = await amqp.connect('amqp://user:password@rabbitmq:5672');
    const channel = await connection.createChannel();
    const exchangeName = 'Refilling-Queue';
    const routingKey = 'create-ship';
  
    await channel.assertExchange(exchangeName, 'topic', { durable: false });
    
    const message = JSON.stringify({
      cmd: cmd,
      data: data
    });
  
    await channel.publish(exchangeName, routingKey, Buffer.from(message));
    console.log('Event published:', message);
  } 
}
