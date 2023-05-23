import { Controller, Get } from '@nestjs/common';
import { TrafficControlService } from './traffic_control.service';

@Controller()
export class TrafficControlController {
  constructor(private readonly trafficControlService: TrafficControlService) {}

  @Get()
  getHello(): string {
    return this.trafficControlService.getHello();
  }
}
