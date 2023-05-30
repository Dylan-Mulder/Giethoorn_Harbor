import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TrafficControlService {
  constructor(private readonly configService: ConfigService){};
  private  USER = this.configService.get('RABBITMQ_USER');
  private  PASSWORD = this.configService.get('RABBITMQ_PASS');
  private  HOST = this.configService.get('RABBITMQ_HOST');

  //EP-T-01	ShipHasBeenCleared Update planning to include cleared state of ship.
  async handleShipHasBeenCleared(ship: any){
    console.log("Traffic Control - Ship has been cleared!")
    //ja verbinden met die db
  }
  //TODO: Remove hello world
  getHello(): string {
    return 'Hello World!';
  }
}
