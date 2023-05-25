import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { RefillingService } from './refilling.service';
import { Ship } from '../models/ship.model';

@Controller()
export class RefillingController {
  constructor(private readonly refillingService: RefillingService) {}

  @MessagePattern('refilling_queue') // Add this decorator to handle messages from the RabbitMQ queue
  async handleMessage(
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
