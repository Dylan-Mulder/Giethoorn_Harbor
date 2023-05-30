import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport, MessagePattern } from '@nestjs/microservices';
import { Pool, PoolClient } from 'pg';
import { Ship } from '../models/ship.model';

@Injectable()
export class RefillingService {
  private readonly client: ClientProxy;
  private pool: Pool;

  constructor() {
    this.createDatabasePool();

    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user:password@localhost:5672'], // Update with your RabbitMQ connection details
        queue: 'Refilling_Queue', // Update with the queue name used by your ShipController
        queueOptions: { durable: true },
      },
    });
  }

  createDatabasePool() {
    this.pool = new Pool({
      host: '127.0.0.1',
      port: 5432,
      user: 'postgres',
      password: 'password',
      database: 'postgres',
    });
  }

  async publishShipEvent(shipData: Partial<Ship>): Promise<void> {
    const message = {
      pattern: 'Refilling_Queue', // Specify the pattern matching the message handler in your ShipController
      data: shipData,
    };

    await this.client.emit(message.pattern, message.data);
  }

  @MessagePattern('create-ship')
  async createShip(shipData: Partial<Ship>): Promise<Ship> {
    const client: PoolClient = await this.pool.connect();

    try {
      const query = `INSERT INTO ships (name) VALUES ($1) RETURNING *`;
      const values = [shipData.name];

      const result = await client.query(query, values);
      const insertedShip: Ship = result.rows[0];

      return insertedShip;
    } finally {
      client.release();
    }
  }
}
