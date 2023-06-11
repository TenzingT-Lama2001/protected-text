import { NextFunction, Request, Response } from 'express';
import ptLogger from '@logger';
import config from 'config';

const logger = ptLogger.child({ file: __filename });
const isDevEnv = config.util.getEnv('NODE_ENV') === 'development';
export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`Not found ${req.method} ${req.originalUrl}`);
  next(error);
}

export function errorHandler(error: Error, req: Request, res: Response, _next: NextFunction) {
  logger.error('Error occurred', { error });
  const { message, name, cause, stack } = error;
  const statusCode = res.statusCode >= 400 ? res.statusCode : 500;
  res.status(statusCode);
  const errorRes: Error = { name, message };
  if (cause) {
    errorRes.cause = cause;
  }
  if (isDevEnv) {
    errorRes.stack = stack;
  }
  return res.send(errorRes);
}
