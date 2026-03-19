import {
  ExceptionFilter,
  Catch,
  type ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { SentryExceptionCaptured } from '@sentry/nestjs';
import { ConfigService } from '@nestjs/config';
import * as Sentry from '@sentry/nestjs';

/**
 * Catch ALL exceptions including unhandled.
 */
@Catch()
export class CatchExceptionsFilter implements ExceptionFilter {
  constructor(private readonly configService: ConfigService) {}

  @SentryExceptionCaptured()
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const env = this.configService.get<'development' | undefined>('NODE_ENV');

    const { method, path } = request;

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let errorMsg: string = 'An unexpected error occurred. Please try again.';

    if (httpStatus === 400) {
      errorMsg = 'Invalid request';
    }

    if (httpStatus === 404) {
      errorMsg = 'Resource not found';
    }

    if (env === 'development') {
      console.log('New Request:', method, path, httpStatus);
    }

    Sentry.logger.info('New Handled Error:', {
      env,
      method,
      path,
      statusCode: httpStatus,
    });

    const responseBody = {
      statusCode: httpStatus,
      message: errorMsg,
    };

    response.status(httpStatus).json(responseBody);
  }
}
