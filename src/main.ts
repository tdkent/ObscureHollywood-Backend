import './instrument';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { CatchExceptionsFilter } from './common/filters/catch-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Swagger Documentation
   */
  const config = new DocumentBuilder()
    .setTitle('Obscure Hollywood API')
    .setDescription(
      'Documentation of endpoints in the Obscure Hollywood REST API.',
    )
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  /**
   * Validation Pipes
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  /**
   * Global Exception Filter
   */
  app.useGlobalFilters(new CatchExceptionsFilter());

  /**
   * Listener
   */
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
