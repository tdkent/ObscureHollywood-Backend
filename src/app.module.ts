import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { SentryModule } from '@sentry/nestjs/setup';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LogRequestsInterceptor } from './common/interceptors/log-requests.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SentryModule.forRoot(),
    ArticlesModule,
  ],
  providers: [
    /**
     * Global Request Logging Interceptor
     */
    {
      provide: APP_INTERCEPTOR,
      useClass: LogRequestsInterceptor,
    },
  ],
})
export class AppModule {}
