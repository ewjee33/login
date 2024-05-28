import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { timeout } from 'connect-timeout';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  app.useGlobalPipes(new ValidationPipe());
  app.use(timeout(process.env.TIMEOUT || '15s'));
  await app.listen(process.env.PORTNUMBER || 10004);
}
bootstrap();
