import './instrument';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Swagger Documentation
   */
  const config = new DocumentBuilder()
    .setTitle('Obscure Hollywood - Server REST API')
    .setDescription('Base API URL is http://localhost:3000')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  /**
   * CORS
   */
  app.enableCors({
    origin: [process.env.FRONTEND_DEV_URL],
    methods: ['GET'],
  });

  /**
   * Validation Pipes
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      /**
       * Implicitly convert types (replaces Type decorator in DTO)
       */
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  /**
   * Listener
   */
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
