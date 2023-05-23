import { Controller, Get } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { MessagePattern, Ctx, RmqContext } from '@nestjs/microservices';

@Controller()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }

  @Get()
  getHello(): string {
    return this.customerService.getHello();
  }

  @MessagePattern({ cmd: 'get-customer' })
  async getUser(@Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return { customer: 'CUSTOMER!' };
  }
}
