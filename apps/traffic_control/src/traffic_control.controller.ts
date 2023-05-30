import { Controller, Get } from '@nestjs/common';
import { TrafficControlService } from './traffic_control.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class TrafficControlController {
  constructor(private readonly trafficControlService: TrafficControlService) {}

  //TEMPLATE 
  @MessagePattern({ exchange: 'ship-registered', routingKey: 'event.ship-registered' })
  async template(
    @Payload() content: string,
    @Ctx() context: RmqContext, // Context to acknowledge the message
  ): Promise<void> {
    try {
      const jsonData = JSON.parse(content);
      await this.trafficControlService.getHello();
      context.getChannelRef().ack(context.getMessage()); // Acknowledge the message
    } catch (error) {
      console.error(error);
    }
  }

  //DE-S-01	ShipHasBeenCleared	A ship has been inspected and cleared.
  @MessagePattern({ exchange: 'ship-registered', routingKey: 'event.ship-registered' })
  async handleShipCleared(
    @Payload() content: string,
    @Ctx() context: RmqContext, // Context to acknowledge the message
  ): Promise<void> {
    try {
      const jsonData = JSON.parse(content);
      const shipData = jsonData.data.ship;
      
      await this.trafficControlService.getHello();
      context.getChannelRef().ack(context.getMessage()); // Acknowledge the message
    } catch (error) {
      console.error(error);
    }
  }

  @Get()
  getHello(): string {
    return this.trafficControlService.getHello();
  }
}
