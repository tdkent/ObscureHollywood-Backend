import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { SentryModule } from '@sentry/nestjs/setup';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LogRequestsInterceptor } from './common/interceptors/log-requests.interceptor';
import { CatchExceptionsFilter } from './common/filters/catch-exception.filter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsModule } from './films/films.module';
import { Film } from 'src/films/entities/film.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SentryModule.forRoot(),
    /**
     * TypeOrm and Postgres connection
     */
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [Film],
        synchronize: false,
        migrationsRun: false,
      }),
    }),
    ArticlesModule,
    FilmsModule,
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
