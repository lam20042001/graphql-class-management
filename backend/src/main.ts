import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4000', // Allow requests from this origin
    methods: 'GET,POST,PUT,DELETE', // Allow these HTTP methods
    allowedHeaders: 'Content-Type,Authorization', // Allow these headers
  });
  await app.listen(3000);
}

bootstrap();
