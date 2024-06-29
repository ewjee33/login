import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { CacheInterceptor } from './utils/CacheInterceptor';
const http = require('http');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  http.globalAgent.keepAlive = true;
  app.useGlobalInterceptors(new CacheInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORTNUMBER || 10004);
}
bootstrap();
