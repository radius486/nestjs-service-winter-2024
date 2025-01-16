import { Injectable, ConsoleLogger, Scope, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggingService extends ConsoleLogger {
  logInfo(req: Request, res: Response) {
    const { method, originalUrl: url, body, query } = req;
    const reqTime = new Date().getTime();

    res.on('finish', () => {
      const { statusCode } = res;
      const resTime = new Date().getTime();
      const timeString = `+${resTime - reqTime}ms`;
      const bodyString = Object.keys(body).length
        ? ` body: ${JSON.stringify(body)}`
        : '';
      const queryString = Object.keys(query).length
        ? ` query: ${JSON.stringify(query)}`
        : '';

      if (
        statusCode === HttpStatus.OK ||
        statusCode === HttpStatus.CREATED ||
        statusCode === HttpStatus.NO_CONTENT
      ) {
        this.log(
          `[LoggingService] ${method} ${url}${bodyString}${queryString} ${statusCode} ${timeString}`,
        );
      }
    });
  }
}
