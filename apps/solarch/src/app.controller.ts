import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private authService: ClientProxy,
    @Inject('SHIP_SERVICE') private shipService: ClientProxy,
    @Inject('CUSTOMER_SERVICE') private customerService: ClientProxy
  ) { }

  @Get()
  async getUser() {
    return this.authService.send(
      {
        cmd: 'get-user',
      },
      {},
    )
  }

  @Get()
  async getShip() {
    return this.shipService.send(
      {
        cmd: 'get-ship'
      },
      {}
    )
  }

  @Get()
  async getCustomer() {
    return this.customerService.send(
      {
        cmd: 'get-customer'
      },
      {}
    )
  }
}
