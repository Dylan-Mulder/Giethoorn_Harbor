import { Injectable } from '@nestjs/common';

@Injectable()
export class RefillingService {
  getHello(): string {
    return 'Hello World!';
  }
}
