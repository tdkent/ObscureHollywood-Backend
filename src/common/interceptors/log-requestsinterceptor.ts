import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import type { Request, Response } from 'express';

@Injectable()
export class LogRequestsInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>();
    const response = httpContext.getResponse<Response>();

    const now = Date.now();

    const { method, path } = request;
    const { statusCode } = response;
    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(
            'New Request:',
            method,
            path,
            statusCode,
            `${Date.now() - now}ms`,
          ),
        ),
      );
  }
}
