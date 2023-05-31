import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';
import { Repository } from 'typeorm';
import { Dock } from '../modules/dock/entities/dock.entity';
import { Passage } from '../modules/passage/entities/passage.entity';
import { Ship } from '../modules/ship/entities/ship.entity';
import { TrafficPlanning } from '../modules/traffic-planning/entities/traffic-planning.entity';
import { Truck } from '../modules/truck/entities/truck.entity';
import { Tugboat } from '../modules/tugboat/entities/tugboat.entity';
import { GHEvent } from '../config/datasources/gh-event';
import { getEventDataSource } from '../config/datasources/event_datasource';
import { getRelationalDataSource } from '../config/datasources/relational_datasource';

@Injectable()
export class TrafficControlService {
  constructor(private readonly configService: ConfigService){
    this.initDatasources();
  };

  // RabbitMQ
  private  USER = this.configService.get('RABBITMQ_USER');
  private  PASSWORD = this.configService.get('RABBITMQ_PASS');
  private  HOST = this.configService.get('RABBITMQ_HOST');

  // Repo's
  private eventRepo: Repository<GHEvent>
  private dockRepo: Repository<Dock>;
  private passageRepo: Repository<Passage>;
  private shipRepo: Repository<Ship>;
  private trafficPlanningRepo: Repository<TrafficPlanning>;
  private truckRepo: Repository<Truck>;
  private tugboatRepo: Repository<Tugboat>;

  async initDatasources() {
    // Init Datasources
    const eventDatasource = await getEventDataSource();
    const relationalDatasource = await getRelationalDataSource();
    // Init repo's
    this.eventRepo = eventDatasource.getRepository(GHEvent);
    this.dockRepo = relationalDatasource.getRepository(Dock);
    this.passageRepo = relationalDatasource.getRepository(Passage);
    this.shipRepo = relationalDatasource.getRepository(Ship);
    this.trafficPlanningRepo = relationalDatasource.getRepository(TrafficPlanning);
    this.truckRepo = relationalDatasource.getRepository(Truck);
    this.tugboatRepo = relationalDatasource.getRepository(Tugboat);
  }

  //Event processors
  //EP-T-01	ShipHasBeenCleared Update planning to include cleared state of ship.
  async updateShipCleared(ship: any){
    console.log("Traffic Control - Ship has been cleared!")
    //TODO: ja verbinden met die db om die ship up te daten.
    //^Returns updated Ship with uuid
  }

  //EP-T-02	ShipHasBeenDenied	Update planning to include denied state of ship.
  async updateShipDenied(ship: any){
    console.log("Traffic Control - Ship's status has been updated!")
    //TODO: ja verbinden met die db om die ship up te daten.
    //^Returns updated Ship with uuid
  }

  //EP-T-03	TruckHasBeenCleared Update planning to include cleared state of Truck.
  async updateTruckCleared(truck: any){
    console.log("Traffic Control - Truck's status has been updated!")
    //TODO: ja verbinden met die db om die Truck up te daten.
    //^Returns updated Truck with uuid
  }

  //EP-T-04	TruckHasBeenDenied	Update planning to include denied state of Truck.
  async updateTruckDenied(truck: any){
    console.log("Traffic Control - Truck's status has been updated!")
    //TODO: ja verbinden met die db om die Truck up te daten.
    //^Returns updated Truck with uuid
  }

  //EP-T-05	DE-C-01	ShipHasBeenUnloaded	Update planning to change ship state.
  async updateShipUnloaded(ship: any){
    console.log("Traffic Control - Ship's status has been updated!")
    //TODO: ja verbinden met die db om die ship up te daten.
    //^Returns updated Ship with uuid
  }

  //EP-T-06	DE-C-02	ShipHasBeenLoaded	Update planning to change ship state.
  async updateShipLoaded(ship: any){
    console.log("Traffic Control - Ship's status has been updated!")
    //TODO: ja verbinden met die db om die ship up te daten.
    //^Returns updated Ship with uuid
  }

  //EP-T-07	LeaseHasStarted	Update internal dock state to allow ships from company.
  async assignDock(dock: any, companyName: any){
    console.log("Traffic Control - Dock has been assigned!");
    //TODO: ja verbinden met die db om die Dock up te daten
    //^Returns updated Dock
  }
  

  //EP-T-08	LeaseHasExpired	Update internal dock state to no longer allow ships from company.
  async unassignDock(dock: any){
    console.log("Traffic Control - Dock has been unassigned!");
    //TODO: ja verbinden met die db om die Dock up te daten
    //^Returns updated Dock
  }

  //EP-T-09	New dock has been created
  async createDock(dock: any){
    //TODO: ja verbinden met die db om die Dock up te daten
    //^Returns updated Dock
  }

  //Event emitter functions
  
  async sendToQueue(exchangeName: string, routingKey: string, message: string){
    const connection = await amqp.connect(`amqp://${this.USER}:${this.PASSWORD}@${this.HOST}`);
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, 'topic', { durable: false });
    await channel.publish(exchangeName, routingKey, Buffer.from(message));
  };
}
