import winston, { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize } = format;
export class DevelopmentLogger {
  public logger;

  constructor() {
    this.logger = createLogger({
      level: 'debug',
      levels: winston.config.syslog.levels,
      format: combine(
        colorize(),
        timestamp({ format: 'HH:mm:ss' }),
        printf(({ level, message, timestamp: msgTimestamp }) => {
          return `${msgTimestamp} ${level}: ${message}`;
        }),
      ),
      transports: [new transports.Console()],
    });
  }
}
