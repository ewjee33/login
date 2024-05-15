import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { timeout } from 'connect-timeout';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  app.use(timeout(process.env.TIMEOUT || '15s'));
  await app.listen(process.env.PORTNUMBER);
}
bootstrap();
