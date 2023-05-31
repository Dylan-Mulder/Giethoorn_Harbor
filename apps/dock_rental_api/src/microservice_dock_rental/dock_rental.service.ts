import { Injectable } from '@nestjs/common';

@Injectable()
export class DockRentalService {
  getHello(): string {
    return 'Hello World!';
  }
}
