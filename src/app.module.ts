import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ArticlesModule } from 'src/articles/articles.module';
import { SentryModule } from '@sentry/nestjs/setup';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LogRequestsInterceptor } from 'src/common/interceptors/log-requests.interceptor';
import { CatchExceptionsFilter } from 'src/common/filters/catch-exception.filter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsModule } from 'src/films/films.module';
import { FeaturesModule } from './features/features.module';
import { PaginationModule } from './common/pagination/pagination.module';
import { PersonsModule } from './persons/persons.module';
import { StudiosModule } from './studios/studios.module';
import { TagsModule } from './tags/tags.module';
import { QuizModule } from './quiz/quiz.module';

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
        autoLoadEntities: true,
        synchronize: false,
        migrationsRun: false,
      }),
    }),
    ArticlesModule,
    FilmsModule,
    FeaturesModule,
    PaginationModule,
    PersonsModule,
    QuizModule,
    StudiosModule,
    TagsModule,
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
     * Global Response Serialization Interceptor
     */
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
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
