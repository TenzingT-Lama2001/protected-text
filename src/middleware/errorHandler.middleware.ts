import { NextFunction, Request, Response } from 'express';
import ptLogger from '@logger';
import HTTP_STATUS from 'http-status-codes';
import { isDevEnv } from 'config/default';
// import { IAppConfig } from '@interface/config.interface';

const logger = ptLogger.child({ file: __filename });
// const isDevEnv = config.get('app') as IAppConfig;
// logger.info('isDevEnv', isDevEnv);
export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  res.status(HTTP_STATUS.NOT_FOUND);
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
