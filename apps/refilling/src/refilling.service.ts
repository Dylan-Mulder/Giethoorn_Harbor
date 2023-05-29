import { Injectable } from '@nestjs/common';
import { Pool, PoolClient } from 'pg';
import { Ship } from '../models/ship.model';
import amqp from 'amqp-connection-manager';

@Injectable()
export class RefillingService {
  private pool: Pool;

  //EP-R-01 ShipRegistered: Add new ship to internal list. 
  async createShip(shipData: any, refillServiceData: any): Promise<Ship> {
    //const client: PoolClient = await this.pool.connect();

    try {
      // const query = `INSERT INTO ships (name) VALUES ($1) RETURNING *`;
      // const values = [shipData.name];
      
      // const result = await client.query(query, values);
      // const insertedShip: Ship = result.rows[0];

      // return insertedShip;
      
      return shipData;
    } finally {
      //client.release();
    }
  }

  //EP-R-02	ShipHasDocked:	Notify internal systems of arrived ship, perform relevant refilling activity.
  async notifyShipHasDocked(shipData: any, refillServiceData: any): Promise<any>{
    //Mock communications
    console.log("Refilling - Ship has docked! Refilling team has been notified.");
    if(refillServiceData[0].needsRefuelling==true){
      this.refuelShip(shipData);
    }

    //Refilling team sets out to work:
    if(refillServiceData[0].needsRecharging==true){
      this.rechargeShip(shipData);
    }

    return true;
  }

  async refuelShip(shipData: Partial<Ship>){
    //Add actual fuel level
    let fuelPercentage = 0;
    //Refuel ship
    while(fuelPercentage<100){
      for (let i = 0; i <= 10; i++) {
        fuelPercentage+=10;
        console.log("Fuel Percentage: "+fuelPercentage+"%");
      }
    }
  console.log("Refilling - Ship has been refilled!");
    //Todo: send ship on queue.
  }

  async rechargeShip(shipData: Partial<Ship>){
    //Add actual fuel level
    let batteryPercentage = 0;
    //Refuel ship
    while(batteryPercentage<100){
      for (let i = 0; i <= 10; i+10) {
        batteryPercentage+=10;
        //console.log("Battery Percentage: "+batteryPercentage+"%");
      }
    }
  console.log("Refilling - Ship has been recharged!");
    //Todo: send ship on queue.
  }

  //EP-R-03	PlanningHasUpdated:	Update internal planning.
  async updatePlanning(planningData: any): Promise<any>{
    //Mock communications
    console.log("Refilling - Planning has updated! ");

    //TODO: UPDATE PLANNING IN DB, return updated planning
    return true;
  }

  //EP-R-04	ShipHasBeenRecharged:	Update internal state of ship to recharged.
  async updateShip(shipData: any, refillingServiceData: any): Promise<any>{
    //Mock communications
    console.log("Refilling - Ship has updated!");

    //TODO: UPDATE SHIP IN DB, return updated ship
    return true;
  }

   stringMessageBuilder(): string{
    return "";
   }
  async sendToQueue(exchangeName: string, routingKey: string, message: string){
    
  }
}
