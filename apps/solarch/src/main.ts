import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import database from '../../database/main'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(5000, () => {
    database.runMigrations();
  });
}
bootstrap();
