import winston from 'winston';
import { config } from 'src/config';
import { DevelopmentLogger } from './DevelopmentLogger';
import { ProductionLogger } from './ProductionLogger';

const getLoggerInstance = (): winston.Logger => {
  let logger: winston.Logger;

  if (config.NODE_ENV === 'DEVELOPMENT') {
    const developmentLogger = new DevelopmentLogger().logger;
    logger = developmentLogger;
  } else {
    const productionLogger = new ProductionLogger().logger;
    logger = productionLogger;
  }

  return logger;
};

const logger = getLoggerInstance() as winston.Logger;

export default logger;
