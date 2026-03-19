import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { SentryModule } from '@sentry/nestjs/setup';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LogRequestsInterceptor } from './common/interceptors/log-requests.interceptor';
import { CatchExceptionsFilter } from './common/filters/catch-exception.filter';

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
    /**
     * Global Exception Filter
     */
    {
      provide: APP_FILTER,
      useClass: CatchExceptionsFilter,
    },
  ],
})
export class AppModule {}
