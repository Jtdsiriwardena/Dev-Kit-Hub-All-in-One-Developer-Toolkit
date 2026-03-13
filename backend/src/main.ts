import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  //CORS
  app.enableCors({
    origin: 'http://localhost:3001', // frontend URL
    credentials: true, // if you plan to use cookies later
  });

  await app.listen(3000);
}
bootstrap();
