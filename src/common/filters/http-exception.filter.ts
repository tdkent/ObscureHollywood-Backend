import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    let errorMsg: string = 'An unexpected error occurred. Please try again.';

    if (status === 400) {
      errorMsg = 'Invalid request';
    }

    if (status === 404) {
      errorMsg = 'Resource not found';
    }

    response.status(status).json({
      statusCode: status,
      message: errorMsg,
    });
  }
}
