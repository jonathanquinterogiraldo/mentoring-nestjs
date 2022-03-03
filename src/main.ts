import { NestFactory } from '@nestjs/core';
import { Logger } from  '@nestjs/common'
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
require('dotenv').config()

async function bootstrap() {

  const logger = new Logger('bootstrap')

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const PORT = process.env.PORT


  await app.listen(PORT);

  logger.log(`Application listening on port: ${PORT}!`);
}
bootstrap();
