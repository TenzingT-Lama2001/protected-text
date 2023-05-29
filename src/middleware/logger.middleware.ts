import { NextFunction, Request, Response } from 'express';
import logger from 'src/logger';

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`Route: ${req.originalUrl} | Method: ${req.method}`);
  next();
};
