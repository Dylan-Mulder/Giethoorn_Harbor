import { Controller, Get } from '@nestjs/common';
import { EcosystemService } from './ecosystem.service';
import { WaterQualityReport } from '../models/waterQualityReport.model';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';



@Controller()
export class EcosystemController {
  constructor(private readonly ecosystemService: EcosystemService) {}

  //EP-P-01 WaterQualityHasBeenInspected: Add new Waterquality to internal list. 
  @MessagePattern({ exchange: 'WaterQuality-Inspected', routingKey: 'event.WaterQuality-Inspected' })
  async handleWaterQualityInspected (
    @Payload() content: string,
    @Ctx() context: RmqContext, // Context to acknowledge the message
  ): Promise<void> {
    try {
      const jsonData = JSON.parse(content);
      const EcosystemData = jsonData.data.refillServiceData; 
      await this.EcosystemService.createWaterQuality(EcosystemData);
      context.getChannelRef().ack(context.getMessage()); // Acknowledge the message
    } catch (error) {
      console.error(error);
    }
  }

  
//EP-P-02 MarineLifeHasBeenInspected: Add new MarineLifeHas to internal list. 
// @MessagePattern({ exchange: 'ship-registered', routingKey: 'event.ship-registered' })
// async handleShipRegistered(
//   @Payload() content: string,
//   @Ctx() context: RmqContext, // Context to acknowledge the message
// ): Promise<void> {
//   try {
//     const jsonData = JSON.parse(content);
//     const shipData = jsonData.data.shipData;
//     const refillServiceData = jsonData.data.refillServiceData; 
//     await this.refillingService.createShip(shipData, refillServiceData);
//     context.getChannelRef().ack(context.getMessage()); // Acknowledge the message
//   } catch (error) {
//     console.error(error);
//   }
// }

}
