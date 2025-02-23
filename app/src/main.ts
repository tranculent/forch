import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverPort = process.env.PORT;

  if (!serverPort) {
    throw new Error("PORT is not defined. Please check your environment variables.");
  }

  // Enable Global Validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Ignore unknown fields
    forbidNonWhitelisted: true, // Reject unknown fields
    transform: true, // Auto-transform payloads
  }));

  // Log all incoming requests
  app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
  });

  app.enableCors(); // Allows frontend to communicate with backend

  // Swagger Configuration
  const config = new DocumentBuilder()
  .setTitle('Workout API')
  .setDescription('API documentation for managing workouts')
  .setVersion('1.0')
  .addTag('workouts')
  .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document); // Access docs at `/api/docs`

  await app.listen(serverPort);
}
bootstrap();
