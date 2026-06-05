import './instrument';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Swagger Documentation
   */
  const config = new DocumentBuilder()
    .setTitle('Obscure Hollywood - REST Server API Documentation')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  /**
   * CORS
   */
  app.enableCors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET'],
  });

  /**
   * Helmet
   */
  app.use(helmet());

  /**
   * Validation Pipes
   */
  app.useGlobalPipes(
    new ValidationPipe({
      /**
       * Unknown URL params are stripped but do not throw an error.
       */
      whitelist: true,
      forbidNonWhitelisted: false,
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
