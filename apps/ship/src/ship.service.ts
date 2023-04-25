import { Injectable } from '@nestjs/common';

@Injectable()
export class ShipService {
  getHello(): string {
    return 'Hello World!';
  }
}
