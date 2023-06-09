import { config } from 'src/config';
import winston, { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize, json } = format;
const getLogger = (): winston.Logger => {
  let myLogger: winston.Logger;

  if (config.nodeEnv === 'DEVELOPMENT') {
    myLogger = createLogger({
      level: 'debug',
      levels: winston.config.syslog.levels,
      defaultMeta: {},
      format: combine(
        config.prettify ? colorize() : json(),
        timestamp({ format: 'HH:mm:ss' }),
        printf(({ level, message, timestamp: msgTimestamp, filename }) => {
          return `${msgTimestamp} ${filename} ${level}: ${message}`;
        }),
      ),
      transports: [new transports.Console(), new transports.File({ filename: 'dev.log' })],
    });
  } else {
    myLogger = createLogger({
      level: 'info',
      levels: winston.config.syslog.levels,
      defaultMeta: {},
      format: combine(timestamp(), config.prettify ? colorize() : json()),
      transports: [new transports.Console(), new transports.File({ filename: 'prod.log' })],
    });
  }

  return myLogger;
};
const logger = getLogger();
export default logger;
