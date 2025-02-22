import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverPort = process.env.PORT;

  if (!serverPort) {
    throw new Error("PORT is not defined. Please check your environment variables.");
  }

  await app.listen(serverPort);
}
bootstrap();
