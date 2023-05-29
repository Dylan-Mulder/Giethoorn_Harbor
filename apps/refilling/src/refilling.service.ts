import { Injectable } from '@nestjs/common';
import { Pool, PoolClient } from 'pg';
import { Ship } from '../models/ship.model';

@Injectable()
export class RefillingService {
  private pool: Pool;

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

  async methodTemplate(message){
    console.log("Refilling Service: Method called with message: "+message);
  }
}
