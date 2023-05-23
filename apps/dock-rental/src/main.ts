import { NestFactory } from '@nestjs/core';
import { DockRentalModule } from './dock-rental.module';

async function bootstrap() {
  const app = await NestFactory.create(DockRentalModule);
  await app.listen(3000);
}
bootstrap();
