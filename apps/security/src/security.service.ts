import { Injectable } from '@nestjs/common';

@Injectable()
export class SecurityService {
  getHello(): string {
    return 'Hello World!';
  }
}
