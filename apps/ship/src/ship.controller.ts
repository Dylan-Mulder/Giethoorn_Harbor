import { Controller, Get } from '@nestjs/common';
import { ShipService } from './ship.service';
import { MessagePattern, Ctx, RmqContext } from '@nestjs/microservices';


@Controller()
export class ShipController {
  constructor(private readonly shipService: ShipService) { }

  @Get()
  getHello(): string {
    return this.shipService.getHello();
  }

  @MessagePattern({ cmd: 'get-ship' })
  async getUser(@Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return { user: 'SHIP!' };
  }
}
