import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('TRAFFIC_CONTROL_SERVICE') private trafficControlService: ClientProxy,
  ) { }

}
