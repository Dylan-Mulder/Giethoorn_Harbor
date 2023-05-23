import { NestFactory } from '@nestjs/core';
import { CargoManagementModule } from './cargo-management.module';

async function bootstrap() {
  const app = await NestFactory.create(CargoManagementModule);
  await app.listen(3000);
}
bootstrap();
