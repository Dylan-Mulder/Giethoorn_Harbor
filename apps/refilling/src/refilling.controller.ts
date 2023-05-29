import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { RefillingService } from './refilling.service';
import { Ship } from '../models/ship.model';

@Controller()
export class RefillingController {
  constructor(private readonly refillingService: RefillingService) {}

  @MessagePattern({ exchange: 'topic_exchange', routingKey: 'event.#' })
  async handleMessage(
    @Payload() message: string,
    @Ctx() context: RmqContext, // Context to acknowledge the message
  ): Promise<void> {
    try {
      console.log("Refilling Controller: handleMessage called.")
      await this.refillingService.methodTemplate(message);
      context.getChannelRef().ack(context.getMessage()); // Acknowledge the message
    } catch (error) {
      console.error(error);
    }
  }

  
  @MessagePattern({ exchange: 'topic_exchange2', routingKey: 'event.#' })
  async handleMessageShip(
    @Payload() shipData: Partial<Ship>, // Payload will contain the ship data from the message
    @Ctx() context: RmqContext, // Context to acknowledge the message
  ): Promise<void> {
    try {
      await this.refillingService.createShip(shipData);
      context.getChannelRef().ack(context.getMessage()); // Acknowledge the message
    } catch (error) {
      console.error(error);
    }
  }
}
