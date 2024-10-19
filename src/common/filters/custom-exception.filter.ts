import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(Error)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const logger = new Logger(CustomExceptionFilter.name);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let message = exception.message;
    let internalMessage = exception.message;
    let statusCode: HttpStatus;

    // Handling different types of exceptions
    if (exception instanceof HttpException) {
      const httpError: any = exception.getResponse();

      if (httpError.message) {
        message = httpError.message;
        internalMessage = httpError.message;
      }
      statusCode = exception.getStatus();
    } else {
      message = 'Internal server error';
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    logger.error(internalMessage, {
      url: request.url,
    });

    response.status(statusCode).json({
      message,
      statusCode,
    });
  }
}
