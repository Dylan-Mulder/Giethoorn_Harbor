import { Injectable } from '@nestjs/common';
import { Pool, PoolClient } from 'pg';
import { Ship } from '../models/ship.model';

@Injectable()
export class RefillingService {
  private pool: Pool;

  //EP-R-01 ShipRegistered: Add new ship to internal list. 
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

  //EP-R-02	ShipHasDocked:	Notify internal systems of arrived ship, perform relevant refilling activity.
  async notifyShipHasDocked(shipData: Partial<Ship>): Promise<any>{
    //Mock communications
    console.log("Refilling - Ship has docked! Refilling team has been notified.");

    //Refilling team sets out to work:
    this.refuelShip(shipData);
    this.rechargeShip(shipData);

    return true;
  }

  async refuelShip(shipData: Partial<Ship>){
    //Add actual fuel level
    const fuelPercentage = 0;
    //Refuel ship
    while(fuelPercentage<100){
      for (let i = 0; i <= 100; i++) {
      setTimeout(() => {}, i * 10);
      }
    }
  console.log("Refilling - Ship has been refilled!");
    //Todo: send ship on queue.
  }

  async rechargeShip(shipData: Partial<Ship>){
    //Add actual fuel level
    const batteryPercentage = 0;
    //Refuel ship
    while(batteryPercentage<100){
      for (let i = 0; i <= 100; i++) {
      setTimeout(() => {}, i * 10);
      }
    }
  console.log("Refilling - Ship has been recharged!");
    //Todo: send ship on queue.
  }

  //EP-R-03	PlanningHasUpdated:	Update internal planning.
  async updatePlanning(shipData: Partial<Ship>): Promise<any>{
    //Mock communications
    console.log("Refilling - Planning has updated! ");
    return true;
  }


  async methodTemplate(message){
    console.log("Refilling Service: Method called with message: "+message);
  }
}
