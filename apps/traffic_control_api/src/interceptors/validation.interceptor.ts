import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { validate } from 'class-validator';

@Injectable()
export class ValidationInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const payload = request.body;

    const errors = await validate(payload);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed', JSON.stringify(errors));
    }

    return next.handle();
  }
}
