import { createLogger, format, transports } from 'winston';
import config from 'config';
import { ILoggerConfig } from '@interface/config/config.interface';
import pkg from '../../package.json';

const { combine, timestamp, json, errors, prettyPrint, metadata } = format;
const loggerConfig = config.get('logger') as ILoggerConfig;

const loggerTransports = [];
if (loggerConfig.transports.includes('FILE')) {
  loggerTransports.push(new transports.File({ filename: loggerConfig.filename }));
}
if (loggerConfig.transports.includes('CONSOLE')) {
  loggerTransports.push(new transports.Console());
}

const logger = createLogger({
  level: loggerConfig.level,
  defaultMeta: { service: pkg.name },
  transports: loggerTransports,
  format: combine(timestamp(), metadata(), errors({ stack: true }), loggerConfig.prettyPrint ? prettyPrint() : json()),
});

export default logger;
