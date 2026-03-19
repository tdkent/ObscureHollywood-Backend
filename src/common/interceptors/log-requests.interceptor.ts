import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import type { Request, Response } from 'express';
import * as Sentry from '@sentry/nestjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LogRequestsInterceptor implements NestInterceptor {
  constructor(private readonly configService: ConfigService) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>();
    const response = httpContext.getResponse<Response>();

    const env = this.configService.get<'development' | undefined>('NODE_ENV');

    const now = Date.now();

    const { method, path } = request;
    const { statusCode } = response;

    return next.handle().pipe(
      tap(() => {
        if (env === 'development') {
          console.log(
            'New Request:',
            method,
            path,
            statusCode,
            `${Date.now() - now}ms`,
          );
        }

        Sentry.logger.info('New Request:', {
          env,
          method,
          path,
          statusCode,
          responseTime: `${Date.now() - now}ms`,
        });
      }),
    );
  }
}
