import { NestFactory } from '@nestjs/core';
import { PublicationsModule } from './publications.module';

async function bootstrap() {
  const app = await NestFactory.create(PublicationsModule);
  await app.listen(3000);
}
bootstrap();
