import { Injectable } from '@nestjs/common';
import { Pool, PoolClient } from 'pg';
import { Ship } from './entities/ship.entity'
import amqp from 'amqp-connection-manager';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RefillingService {
  private pool: Pool;

  constructor(private readonly configService: ConfigService){};
  private  USER = this.configService.get('RABBITMQ_USER');
  private  PASSWORD = this.configService.get('RABBITMQ_PASS');
  private  HOST = this.configService.get('RABBITMQ_HOST');

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
    console.log(refillServiceData, shipData);
    if(refillServiceData[0].needsRefuelling==true){
      this.refuelShip(shipData, refillServiceData);
    }

    //Refilling team sets out to work:
    if(refillServiceData[0].needsRecharging==true){
      this.rechargeShip(shipData, refillServiceData);
    }

    return true;
  }

  async refuelShip(shipData: Partial<Ship>, refillingServiceData: Partial<RefillingService>){
    //Add actual fuel level
    let fuelPercentage = 0;
    //Refuel ship
    while(fuelPercentage<100){
      for (let i = 0; i <= 9; i++) {
        fuelPercentage+=10;
        console.log("Fuel Percentage: "+fuelPercentage+"%");
      }
    }
    console.log("Refilling - Ship has been refilled!");
    const jsonShipData = JSON.parse(JSON.stringify(shipData));
    const updatedRefillingServiceData = {
      "data":{
          "shipData":[
            shipData[0]
          ],
          "refillServiceData":[
            {
              "id":refillingServiceData[0].id,
              "needsRefuelling": false
            }
          ]
    }};
    const jsonRefillingServiceData=JSON.parse(JSON.stringify(updatedRefillingServiceData));
    const messageToSend = this.stringMessageBuilder(jsonShipData, jsonRefillingServiceData, null);
    this.sendToQueue("ship-has-refuelled", "event.ship-has-refuelled", messageToSend);
  }

  async rechargeShip(shipData: Partial<Ship>,  refillingServiceData: Partial<RefillingService>){
    //Add actual fuel level
    let batteryPercentage = 0;
    //Refuel ship
    while(batteryPercentage<100){
      for (let i = 0; i <= 9; i++) {
        batteryPercentage+=10;
        //console.log("Battery Percentage: "+batteryPercentage+"%");
      }
    }
  console.log("Refilling - Ship has been recharged!");
  const jsonShipData = JSON.parse(JSON.stringify(shipData));
  const jsonRefillingServiceData = JSON.parse(JSON.stringify(refillingServiceData));
    jsonRefillingServiceData[0].needsRecharging = false;
  const messageToSend = this.stringMessageBuilder(jsonShipData, jsonRefillingServiceData, null);
  this.sendToQueue("ship-has-recharged", "event.ship-has-recharged", messageToSend);
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

  stringMessageBuilder(
    shipData: object[],
    refillServiceData: object[],
    trafficPlanningData: object[]
  ): string {
    if(!shipData){shipData= [];}
    if(!refillServiceData){refillServiceData = [];}
    if(!trafficPlanningData){trafficPlanningData = [];}
    const jsonData = {
      data: {
        shipData,
        refillServiceData,
        trafficPlanningData
      }
    };
  
    return JSON.stringify(jsonData);
  }
 
  async sendToQueue(exchangeName: string, routingKey: string, message: string){
    const connection = await amqp.connect(`amqp://${this.USER}:${this.PASSWORD}@${this.HOST}`);
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, 'topic', { durable: false });
    await channel.publish(exchangeName, routingKey, Buffer.from(message));
  };
}
