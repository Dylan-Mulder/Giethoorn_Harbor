import { Injectable } from '@nestjs/common';

@Injectable()
export class CargoManagementService {
  getHello(): string {
    return 'Hello World!';
  }
}
