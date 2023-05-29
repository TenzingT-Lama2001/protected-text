import winston, { createLogger, format, transports } from 'winston';

const { combine, timestamp, json } = format;
export class ProductionLogger {
  public logger;

  constructor() {
    this.logger = createLogger({
      level: 'info',
      levels: winston.config.syslog.levels,
      format: combine(timestamp(), json()),
      transports: [new transports.Console(), new transports.File({ filename: 'combined.log' })],
    });
  }
}
