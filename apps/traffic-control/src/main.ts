import { NestFactory } from '@nestjs/core';
import { TrafficControlModule } from './traffic-control.module';

async function bootstrap() {
  const app = await NestFactory.create(TrafficControlModule);
  await app.listen(3000);
}
bootstrap();
