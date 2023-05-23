import { Injectable } from '@nestjs/common';

@Injectable()
export class PublicationsService {
  getHello(): string {
    return 'Hello World!';
  }
}
