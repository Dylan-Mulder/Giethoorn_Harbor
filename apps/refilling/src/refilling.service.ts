import { Injectable } from '@nestjs/common';
import { Pool, PoolClient } from 'pg';
import { Ship } from '../models/ship.model';

@Injectable()
export class RefillingService {
  private pool: Pool;

  constructor() {
    this.createDatabasePool();
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
