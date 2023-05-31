import { Injectable } from '@nestjs/common';
import { Pool, PoolClient } from 'pg';
import { Ship } from './entities/ship.entity'
import amqp from 'amqp-connection-manager';
import { ConfigService } from '@nestjs/config';
import { getRelationalDataSource } from './config/datasources/relational_datasource';
import { Service } from './entities/service.entity';
import { TrafficPlanning } from './entities/traffic-planning.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RefillingService {
  constructor(private readonly configService: ConfigService){
    this.initDatasources();
  };

  private pool: Pool;

  // RabbitMQ
  private  USER = this.configService.get('RABBITMQ_USER');
  private  PASSWORD = this.configService.get('RABBITMQ_PASS');
  private  HOST = this.configService.get('RABBITMQ_HOST');

  // Repo's
  private serviceRepo: Repository<Service>;
  private shipRepo: Repository<Ship>;
  private trafficPlanningRepo: Repository<TrafficPlanning>;

  // Init the repositories
  async initDatasources() {
    const relationalDatasource = await getRelationalDataSource();
    this.serviceRepo = relationalDatasource.getRepository(Service);
    this.shipRepo = relationalDatasource.getRepository(Ship);
    this.trafficPlanningRepo = relationalDatasource.getRepository(TrafficPlanning);
  }

  //EP-R-01 ShipRegistered: Add new ship to internal list. 
  async createShip(shipData: any, refillServiceData: any, trafficPlanningData: any): Promise<void> {
    const ship = new Ship();
    ship.name=shipData[0].name;

    const refillService = new Service();
    refillService.needs_recharging=refillServiceData[0].needsRecharging;
    refillService.needs_refuelling=refillServiceData[0].needsRefuelling;

    const trafficPlanning = new TrafficPlanning();
    trafficPlanning.dock_name=trafficPlanningData[0].dockName;
    trafficPlanning.arrival=new Date(trafficPlanningData[0].arrival);
    trafficPlanning.departure=new Date(trafficPlanningData[0].departure);

    await this.trafficPlanningRepo.save(trafficPlanning).then(trafficPlanning => {refillService.traffic_planning_id=trafficPlanning.id})
    await this.shipRepo.save(ship).then(ship => {refillService.ship_id=ship.id});
    await this.serviceRepo.save(refillService);
    console.log("Posting done.");
    console.log(this.serviceRepo.find());
    console.log(this.shipRepo.find());
    console.log(this.trafficPlanningRepo.find());
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
