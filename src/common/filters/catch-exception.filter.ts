import {
  ExceptionFilter,
  Catch,
  type ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { SentryExceptionCaptured } from '@sentry/nestjs';

/**
 * Catch ALL exceptions including unhandled.
 */
@Catch()
export class CatchExceptionsFilter implements ExceptionFilter {
  @SentryExceptionCaptured()
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    console.log('Error:', httpStatus, request.method, request.path);

    let errorMsg: string = 'An unexpected error occurred. Please try again.';

    if (httpStatus === 400) {
      errorMsg = 'Invalid request';
    }

    if (httpStatus === 404) {
      errorMsg = 'Resource not found';
    }

    const responseBody = {
      statusCode: httpStatus,
      message: errorMsg,
    };

    response.status(httpStatus).json(responseBody);
  }
}
