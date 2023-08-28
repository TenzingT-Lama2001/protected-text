import { NextFunction, Request, Response } from 'express';
import ptLogger from '@logger';
import HTTP_STATUS from 'http-status-codes';
import { CustomError } from 'src/error/custom.error';
import { isDevEnv } from '@config/default';

const logger = ptLogger.child({ file: __filename });

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  res.status(HTTP_STATUS.NOT_FOUND);
  const error = new Error(`Not found ${req.method} ${req.originalUrl}`);
  next(error);
}

export function errorHandler(error: CustomError, _req: Request, res: Response, _next: NextFunction) {
  logger.error('Error occurred', { error });

  const { details, message, name, cause, statusCode, stack } = error;

  let resStatusCode = statusCode || res.statusCode;
  resStatusCode = resStatusCode < 400 ? 500 : resStatusCode;
  res.status(resStatusCode);

  const errorRes: CustomError = { name, message, details };
  if (cause) {
    errorRes.cause = cause;
  }
  if (isDevEnv) {
    errorRes.stack = stack;
  }
  return res.send(errorRes);
}
