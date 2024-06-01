import { Response } from 'express';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { Injectable } from '@nestjs/common';

interface Loggers {
  info: (message: string) => void;
  warn: (message: string) => void;
  error: (message: string) => void;
}

@Injectable()
export class Logger {
  private logFormat: winston.Logform.Format;
  private infoLogger : winston.Logger;
  private warnLogger : winston.Logger;
  private errorLogger : winston.Logger;
  //FIXME : Fix Loggers type
  private Loggers : Loggers;
  private logDir : string;
  private environment: string;
  private title : string;
  private service : string;
  constructor() {
    this.title = process.env.TITLE || "none";
    this.service = 'zeus-social';
    this.setupLogFormat();
    this.setupWinstonLogger();
  }

  private setupLogFormat(): void {
    this.logDir = `${process.cwd()}/logs`;
    this.environment = process.env.ELASTIC_APM_ENVIRONMENT ?? "dev";
    this.logFormat = winston.format.printf(({ level, message}) => {
      const timeStamp = new Date().toISOString();
      const { zeusId, requestUrl , msg } = message;
      const developStep = this.environment === 'production' ? 'v1' : 'test';
      return `[${this.environment}][${level}][${this.service}][${this.title}][${developStep}][${requestUrl}][${zeusId}][${msg}][${timeStamp}]`;
    });
  }

  //@ts-ignore
  private createWinstonLogger(level: string, directory: string): winston.Logger {
    const transport = new winston.transports.DailyRotateFile({
      level: level,
      datePattern: 'YYYY-MM-DD',
      dirname: `${this.logDir}/${this.title}/${this.service}`,
      filename: `${directory}-%DATE%.log`,
      maxFiles: 2,
    });
    
    return winston.createLogger({
      format: winston.format.combine(
        this.logFormat,
      ),
      transports: [
        transport
      ],
    });
  }

  private setupWinstonLogger(): void {
    this.infoLogger = this.createWinstonLogger('info' , 'info')
    this.warnLogger = this.createWinstonLogger('warn' , 'error')
    this.errorLogger = this.createWinstonLogger('error' , 'error')
    this.Loggers = {
      info: (message: string) => this.infoLogger.info(message),
      warn: (message: string) => this.warnLogger.warn(message),
      error: (message: string) => this.errorLogger.error(message)
    };
  }

  private consoleLog(endpoint, startTime, params = {}) {
    console.log(JSON.stringify({
      't': new Date().toISOString(),
      'pid': process.pid,
      'endpoint': endpoint,
      'elapsed': Date.now() - startTime,
      'params': params
    }))
  }
  
  public log(level, logMessage) {
    const requestUrl = logMessage[0] || "/";
    const msg = logMessage[1] || " ";
    const zeusId = logMessage[2] || "NotUsed";
    this.Loggers[level]({requestUrl: requestUrl, msg: msg , zeusId: zeusId});
  }

  public logAndSend(endpoint, startTime, res: Response, responseParams, level, logMessage, msg = null ){
    const logParams = {};
    if(responseParams.reason instanceof Error){
      responseParams.reason = responseParams.reason.toString();
    }
    logParams['result'] = responseParams.result;
    logParams['reason'] = responseParams.reason;
    this.consoleLog(endpoint, startTime, logParams);
    const requestUrl = logMessage[0] || "/";
    const zeusId = logMessage[1] || "NotUsed";
    this.Loggers[level]({requestUrl: requestUrl , msg: msg || responseParams.reason || " " , zeusId : zeusId });
    return res.send(responseParams);
  }
}
