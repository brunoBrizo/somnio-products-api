import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from '@interceptors/transform.interceptor';
import { validationPipeConfig } from '@config/validationPipe.config';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';

async function bootstrap() {
  const logger = new Logger('Main app');
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  app.use(helmet());

  app.useGlobalPipes(new ValidationPipe(validationPipeConfig));
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new TransformInterceptor());

  // Increase request size limit
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  const port = process.env.PORT;
  await app.listen(port);

  logger.log(`App running on port ${port}`);
}
bootstrap();
