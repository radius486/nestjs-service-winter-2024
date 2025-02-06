import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ErrorMessages } from '../constants/error-messages';
import { LoggingService } from 'src/logging/logging.service';

export type ResponseBody = {
  error: true;
  statusCode: number;
  timestamp: string;
  path: string;
  message: string;
  method: string;
};

@Catch()
export class CommonExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private loggingService: LoggingService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: string = ErrorMessages.somethingWentWrong;

    if (exception instanceof HttpException) {
      const response: any = exception.getResponse();

      message = Array.isArray(response.message)
        ? response.message.join(', ')
        : exception.message;
    }

    const responseBody: ResponseBody = {
      error: true,
      method: httpAdapter.getRequestMethod(ctx.getRequest()),
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message,
    };

    this.loggingService.logError(responseBody);
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
