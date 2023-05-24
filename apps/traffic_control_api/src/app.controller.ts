import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('TRAFFIC_CONTROL_SERVICE') private trafficControlService: ClientProxy,
    @Inject('SECURITY_SERVICE') private securityService: ClientProxy,
    @Inject('REFILLING_SERVICE') private refillingService: ClientProxy,
    @Inject('CARGO_MANAGEMENT_SERVICE') private cargoService: ClientProxy,
    @Inject('PUBLICATION_SERVICE') private publicationService: ClientProxy,

  ) { }

}
