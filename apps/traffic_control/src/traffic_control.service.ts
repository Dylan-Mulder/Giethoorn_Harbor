import { Injectable } from '@nestjs/common';

@Injectable()
export class TrafficControlService {
  getHello(): string {
    return 'Hello World!';
  }
}
