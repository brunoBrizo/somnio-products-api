import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from '@interceptors/transform.interceptor';
import { validationPipeConfig } from '@config/validationPipe.config';

async function bootstrap() {
  const logger = new Logger('Main app');
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe(validationPipeConfig));

  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new TransformInterceptor());

  const port = process.env.PORT;
  await app.listen(port);

  logger.log(`App running on port ${port}`);
}
bootstrap();
