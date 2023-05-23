import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('DOCK_RENTAL_SERVICE') private dockRentalService: ClientProxy,

  ) { }
}