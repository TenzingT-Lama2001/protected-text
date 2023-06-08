import { config } from 'src/config';
import winston, { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize, json } = format;
const getLogger = (filename: string): winston.Logger => {
  let myLogger: winston.Logger;

  if (config.NODE_ENV === 'DEVELOPMENT') {
    myLogger = createLogger({
      level: 'debug',
      levels: winston.config.syslog.levels,
      defaultMeta: { filename },
      format: combine(
        config.PREETIFY === 'true' ? colorize() : json(),
        timestamp({ format: 'HH:mm:ss' }),
        printf(({ level, message, timestamp: msgTimestamp }) => {
          return `${msgTimestamp} ${filename} ${level}: ${message}`;
        }),
      ),
      transports: [new transports.Console(), new transports.File({ filename: 'dev.log' })],
    });
  } else {
    myLogger = createLogger({
      level: 'info',
      levels: winston.config.syslog.levels,
      defaultMeta: { filename },
      format: combine(timestamp(), config.PREETIFY === 'true' ? colorize() : json()),
      transports: [new transports.Console(), new transports.File({ filename: 'prod.log' })],
    });
  }

  return myLogger;
};
export default getLogger;
