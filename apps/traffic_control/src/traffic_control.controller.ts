import { Controller, Get } from '@nestjs/common';
import { TrafficControlService } from './traffic_control.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class TrafficControlController {
  constructor(private readonly trafficControlService: TrafficControlService) {}

  //Consumer functions
  //DE-S-01	ShipHasBeenCleared	A ship has been inspected and cleared.
  @MessagePattern({ exchange: 'ship-has-been-cleared', routingKey: 'event.ship-has-been-cleared' })
  async handleShipCleared(
    @Payload() content: string,
    @Ctx() context: RmqContext, // Context to acknowledge the message
  ): Promise<void> {
    try {
      const jsonData = JSON.parse(content);
      const shipData = jsonData.data.ship;
      console.log(JSON.stringify(jsonData));
      
      await this.trafficControlService.updateShipCleared(shipData);
      context.getChannelRef().ack(context.getMessage()); // Acknowledge the message
    } catch (error) {
      console.error(error);
    }
  }

  //DE-S-02	ShipHasBeenDenied	A ship has failed inspection.
  @MessagePattern({ exchange: 'ship-has-been-denied', routingKey: 'event.ship-has-been-denied' })
  async handleShipDenied(
    @Payload() content: string,
    @Ctx() context: RmqContext, // Context to acknowledge the message
  ): Promise<void> {
    try {
      const jsonData = JSON.parse(content);
      const shipData = jsonData.data.ship;
      
      await this.trafficControlService.updateShipDenied(shipData);
      context.getChannelRef().ack(context.getMessage()); // Acknowledge the message
    } catch (error) {
      console.error(error);
    }
  }

  //DE-S-03	TruckHasBeenCleared	A truck has been inspected and cleared.
  @MessagePattern({ exchange: 'truck-has-been-cleared', routingKey: 'event.truck-has-been-cleared' })
  async handleTruckCleared(
    @Payload() content: string,
    @Ctx() context: RmqContext, // Context to acknowledge the message
  ): Promise<void> {
    try {
      const jsonData = JSON.parse(content);
      const truckData = jsonData.data.truck;

      await this.trafficControlService.updateTruckCleared(truckData);
      context.getChannelRef().ack(context.getMessage()); // Acknowledge the message
    } catch (error) {
      console.error(error);
    }
  }

  //DE-S-03	TruckHasBeenDenied	A truck has failed inspection.
  @MessagePattern({ exchange: 'truck-has-been-denied', routingKey: 'event.truck-has-been-denied' })
  async handleTruckDenied(
    @Payload() content: string,
    @Ctx() context: RmqContext, // Context to acknowledge the message
  ): Promise<void> {
    try {
      const jsonData = JSON.parse(content);
      const truckData = jsonData.data.truck;

      await this.trafficControlService.updateTruckDenied(truckData);
      context.getChannelRef().ack(context.getMessage()); // Acknowledge the message
    } catch (error) {
      console.error(error);
    }
  }

  //DE-C-01	ShipHasBeenUnloaded	A ship's cargo has been unloaded.
  @MessagePattern({ exchange: 'ship-has-been-unloaded', routingKey: 'event.ship-has-been-unloaded' })
  async handleShipUnloaded(
    @Payload() content: string,
    @Ctx() context: RmqContext, // Context to acknowledge the message
  ): Promise<void> {
    try {
      const jsonData = JSON.parse(content);
      const shipData = jsonData.data.ship;

      await this.trafficControlService.updateShipUnloaded(shipData);
      context.getChannelRef().ack(context.getMessage()); // Acknowledge the message
    } catch (error) {
      console.error(error);
    }
  }

  //DE-C-02	ShipHasBeenLoaded	A ship's cargo has been loaded.
  @MessagePattern({ exchange: 'ship-has-been-loaded', routingKey: 'event.ship-has-been-loaded' })
  async handleShipLoaded(
    @Payload() content: string,
    @Ctx() context: RmqContext, // Context to acknowledge the message
  ): Promise<void> {
    try {
      const jsonData = JSON.parse(content);
      const shipData = jsonData.data.ship;

      await this.trafficControlService.updateShipLoaded(shipData);
      context.getChannelRef().ack(context.getMessage()); // Acknowledge the message
    } catch (error) {
      console.error(error);
    }
  }

  //DE-D-02	LeaseHasStarted	A Lease on a dock has started.
  @MessagePattern({ exchange: 'lease-has-started', routingKey: 'event.lease-has-started' })
  async handleLeaseStarted(
    @Payload() content: string,
    @Ctx() context: RmqContext, // Context to acknowledge the message
  ): Promise<void> {
    try {
      const jsonData = JSON.parse(content);
      const dockData = jsonData.data.dock;
      const companyName = jsonData.data.companyName;

      await this.trafficControlService.assignDock(dockData, companyName);
      context.getChannelRef().ack(context.getMessage()); // Acknowledge the message
    } catch (error) {
      console.error(error);
    }
  }

  //DE-D-03	LeaseHasExpired	A Lease on a dock has expired.
  @MessagePattern({ exchange: 'lease-has-expired', routingKey: 'event.lease-has-expired' })
  async handleLeaseExpired(
    @Payload() content: string,
    @Ctx() context: RmqContext, // Context to acknowledge the message
  ): Promise<void> {
    try {
      const jsonData = JSON.parse(content);
      const dockData = jsonData.data.dock;
      const companyName = jsonData.data.companyName;

      await this.trafficControlService.unassignDock(dockData);
      context.getChannelRef().ack(context.getMessage()); // Acknowledge the message
    } catch (error) {
      console.error(error);
    }
  }

  //Event emitter functions
  //QUESTION: Functions here

}
