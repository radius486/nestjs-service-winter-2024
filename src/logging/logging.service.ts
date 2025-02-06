import { Injectable, ConsoleLogger, Scope, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseBody } from 'src/common/exception-filters/common-exception.filter';
import * as fs from 'fs';
import {
  LOG_DIRECTORY_PATH,
  LOG_PATH,
  LOG_TYPE,
} from 'src/common/constants/common';

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
        const message = `[LoggingService] ${method}: ${url}${bodyString}${queryString} ${statusCode} ${timeString}`;
        this.log(message);
        this.writeLog(message, LOG_TYPE.INFO);
      }
    });
  }

  logError(responseBody: ResponseBody) {
    const { method, statusCode, path } = responseBody;
    const message = `[LoggingService] ${method}: ${path} ${statusCode}`;

    this.error(message);
    this.writeLog(message, LOG_TYPE.ERROR);
  }

  private writeLog(message: string, type: LOG_TYPE) {
    const date = new Date().toLocaleString();
    const path = type === LOG_TYPE.ERROR ? LOG_PATH.ERROR : LOG_PATH.INFO;

    if (!fs.existsSync(LOG_DIRECTORY_PATH)) {
      fs.mkdirSync(LOG_DIRECTORY_PATH);
    }

    try {
      fs.appendFileSync(path, `${date} ${type} ${message}\n`);
    } catch (error) {
      this.log(error);
    }

    this.reduceFile(path);
  }

  private reduceFile(path: LOG_PATH) {
    while (
      fs.statSync(path).size >= (Number(process.env.LOG_FILE_SIZE) || 4000)
    ) {
      const oldCsvContent = fs.readFileSync(path).toString().split('\n');
      oldCsvContent.shift();
      const newCsvContent = oldCsvContent.join('\n');

      fs.writeFileSync(path, newCsvContent);
    }
  }
}
