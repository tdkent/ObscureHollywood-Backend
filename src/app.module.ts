import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { SentryModule } from '@sentry/nestjs/setup';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SentryModule.forRoot(),
    ArticlesModule,
  ],
})
export class AppModule {}
