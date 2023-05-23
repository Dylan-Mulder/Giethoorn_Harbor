import { NestFactory } from '@nestjs/core';
import { RefillingModule } from './refilling.module';

async function bootstrap() {
  const app = await NestFactory.create(RefillingModule);
  await app.listen(3000);
}
bootstrap();
