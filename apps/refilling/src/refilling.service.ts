import { Injectable } from '@nestjs/common';
import { Pool, PoolClient } from 'pg';
import { Ship } from './entities/ship.entity';
import amqp from 'amqp-connection-manager';
import { ConfigService } from '@nestjs/config';
import { getRelationalDataSource } from './config/datasources/relational_datasource';
import { Service } from './entities/service.entity';
import { TrafficPlanning } from './entities/traffic-planning.entity';
import { Repository } from 'typeorm';
import { GHEvent } from './entities/gh-event';
import { getEventDataSource } from './config/datasources/event_datasource';

@Injectable()
export class RefillingService {
  constructor(private readonly configService: ConfigService) {
    this.initDatasources();
  }

  private pool: Pool;

  // RabbitMQ
  private USER = this.configService.get('RABBITMQ_USER');
  private PASSWORD = this.configService.get('RABBITMQ_PASS');
  private HOST = this.configService.get('RABBITMQ_HOST');

  // Repo's
  private eventRepo: Repository<GHEvent>;
  private serviceRepo: Repository<Service>;
  private shipRepo: Repository<Ship>;
  private trafficPlanningRepo: Repository<TrafficPlanning>;

  async initDatasources() {
    // Init datasources
    const eventDatasource = await getEventDataSource();
    const relationalDatasource = await getRelationalDataSource();
    // Init repo's
    this.eventRepo = eventDatasource.getRepository(GHEvent);
    this.serviceRepo = relationalDatasource.getRepository(Service);
    this.shipRepo = relationalDatasource.getRepository(Ship);
    this.trafficPlanningRepo =
      relationalDatasource.getRepository(TrafficPlanning);
  }

  //EP-R-01 ShipRegistered: Add new ship to internal list.
  async createShip(
    shipData: any,
    refillServiceData: any,
    trafficPlanningData: any,
  ): Promise<void> {
    const ship = new Ship();
    ship.name = shipData.name;

    const refillService = new Service();
    refillService.needs_recharging = refillServiceData.needsRecharging;
    refillService.needs_refuelling = refillServiceData.needsRefuelling;

    const trafficPlanning = new TrafficPlanning();
    trafficPlanning.dock_name = trafficPlanningData.dockName;
    trafficPlanning.arrival = new Date(trafficPlanningData.arrival);
    trafficPlanning.departure = new Date(trafficPlanningData.departure);

    await this.trafficPlanningRepo
      .save(trafficPlanning)
      .then((trafficPlanning) => {
        refillService.traffic_planning_id = trafficPlanning.id;
      });
    await this.shipRepo.save(ship).then((ship) => {
      refillService.ship_id = ship.id;
    });
    await this.serviceRepo.save(refillService);
    console.log('Posting done.');
    console.log(this.serviceRepo.find());
    console.log(this.shipRepo.find());
    console.log(this.trafficPlanningRepo.find());
  }

  //EP-R-02	ShipHasDocked:	Notify internal systems of arrived ship, perform relevant refilling activity.
  async notifyShipHasDocked(
    shipData: any,
  ) {
    //Mock communications
    console.log(
      'Refilling - Ship has docked! Refilling team has been notified.',
    );
      let refillServiceData2: any;
      refillServiceData2= await this.serviceRepo.findOneBy({
        ship_id:shipData.id
      });
      console.log(JSON.stringify(refillServiceData2))
      let refillServiceData3 = JSON.stringify(refillServiceData2);
      let refillServiceData=JSON.parse(refillServiceData3);

    //Refilling team sees a notif and sets out to work:
    
    if (refillServiceData.needs_refuelling == true) {
      this.refuelShip(shipData, refillServiceData);
    }
    if (refillServiceData.needs_recharging == true) {
      this.rechargeShip(shipData, refillServiceData);
    }
  }

  async refuelShip(
    shipData: Partial<Ship>,
    refillingServiceData: Partial<RefillingService>,
  ) {
    let fuelPercentage = 0;
    //Refuel ship
    while (fuelPercentage < 100) {
      for (let i = 0; i <= 9; i++) {
        fuelPercentage += 10;
        console.log('Fuel Percentage: ' + fuelPercentage + '%');
      }
    }
    console.log('Refilling - Ship has been refilled!');
    const jsonShipData = JSON.parse(JSON.stringify(shipData));
    const updatedRefillingServiceData = JSON.parse(JSON.stringify(refillingServiceData))
    updatedRefillingServiceData.needs_refuelling=false;

    const messageToSend = this.stringMessageBuilder(
      jsonShipData,
      updatedRefillingServiceData,
      null,
    );

    //Update DB
    const shipId = shipData.id;
    const serviceToUpdate = await this.serviceRepo.findOneBy({
      ship_id:shipId
    })

    serviceToUpdate.needs_refuelling=false;
    console.log(serviceToUpdate);
    let returnedObject;
    await this.serviceRepo.save(serviceToUpdate).then(service => {returnedObject=service});
    this.addToEventStore(JSON.stringify(returnedObject.stream_id),'ship-has-refuelled',messageToSend);
    
    //Emit to queue
    this.sendToQueue(
      'ship-has-refuelled',
      'event.ship-has-refuelled',
      messageToSend,
    );
  }

  async rechargeShip(
    shipData: Partial<Ship>,
    refillingServiceData: Partial<RefillingService>,
  ) {
    //Add actual fuel level
    let batteryPercentage = 0;
    //Refuel ship
    while (batteryPercentage < 100) {
      for (let i = 0; i <= 9; i++) {
        batteryPercentage += 10;
        //console.log("Battery Percentage: "+batteryPercentage+"%");
      }
    }
    console.log('Refilling - Ship has been recharged!');
    const jsonShipData = JSON.parse(JSON.stringify(shipData));
    const jsonRefillingServiceData = JSON.parse(
      JSON.stringify(refillingServiceData),
    );
    jsonRefillingServiceData.needs_recharging = false;
    const messageToSend = this.stringMessageBuilder(
      jsonShipData,
      jsonRefillingServiceData,
      null,
    );
    //Update DB
    const shipId = shipData.id;
    const serviceToUpdate = await this.serviceRepo.findOneBy({
      ship_id:shipId
    })

    serviceToUpdate.needs_recharging=false;
    console.log(serviceToUpdate);
    let returnedObject;
    await this.serviceRepo.save(serviceToUpdate).then(service => {returnedObject=service});
    this.addToEventStore(JSON.stringify(returnedObject.stream_id),'ship-has-recharged',messageToSend);

    //Emit to queue
    this.sendToQueue(
      'ship-has-recharged',
      'event.ship-has-recharged',
      messageToSend,
    );
  }

  //EP-R-03	PlanningHasUpdated:	Update internal planning.
  async updatePlanning(planningData: any): Promise<any> {
    console.log('Refilling - Planning has updated! ');
    const trafficPlanning = new TrafficPlanning();
    trafficPlanning.dock_name = planningData.dock_name;
    trafficPlanning.arrival = new Date(planningData.arrival);
    trafficPlanning.departure = new Date(planningData.departure);
    let planningToUpdate = await this.trafficPlanningRepo.findOneBy(
      {
        id: planningData.id
      }
    )
    let returnedObject;
    await this.trafficPlanningRepo.save(planningToUpdate).then(traffic_planning =>{returnedObject=traffic_planning});
    this.addToEventStore(JSON.stringify(returnedObject.stream_id),'planning-has-updated',returnedObject);
    return true;
  }

  //EP-R-04	ShipHasBeenRecharged:	Update internal state of ship to recharged.
  async updateService(shipData: any, refillingServiceData: any): Promise<any> {
    console.log('Refilling - Service has updated!');

    const service = new Service();
    service.traffic_planning_id = refillingServiceData.traffic_planning_id;
    service.ship_id=refillingServiceData.ship_id;
    service.needs_recharging=refillingServiceData.needs_recharging;
    service.needs_refuelling=refillingServiceData.needs_refuelling;

    let serviceToUpdate = await this.serviceRepo.findOneBy(
      {
        traffic_planning_id:refillingServiceData.traffic_planning_id,
        ship_id:refillingServiceData.ship_id
      }
    )
    let returnedObject;
    await this.serviceRepo.save(serviceToUpdate).then(service =>{returnedObject=service});
    this.addToEventStore(JSON.stringify(returnedObject.stream_id),'ship-has-updated',returnedObject);
  }

  stringMessageBuilder(
    shipData: object[],
    refillService: object[],
    trafficPlanningData: object[],
  ): string {
    if (!shipData) {
      shipData = [];
    }
    if (!refillService) {
      refillService = [];
    }
    if (!trafficPlanningData) {
      trafficPlanningData = [];
    }
    const jsonData = {
      data: {
        shipData,
        refillService: refillService,
        trafficPlanningData,
      },
    };

    return JSON.stringify(jsonData);
  }

  async sendToQueue(exchangeName: string, routingKey: string, message: string) {
    const connection = await amqp.connect(
      `amqp://${this.USER}:${this.PASSWORD}@${this.HOST}`,
    );
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, 'topic', { durable: false });
    await channel.publish(exchangeName, routingKey, Buffer.from(message));
  }

  async addToEventStore(stream_id: string, type: string, body: string) {
    let ghEvent = new GHEvent;
    ghEvent.stream_id = stream_id;
    ghEvent.type = type;
    ghEvent.body = body;

    await this.eventRepo.save(ghEvent);
  }
}
