import { StatusCodes as HTTP_STATUS } from 'http-status-codes';

export class CustomError extends Error {
  statusCode?: HTTP_STATUS;

  details: [];

  cause?: string | undefined;

  constructor(public message: string, details: [], cause?: string, statusCode?: HTTP_STATUS) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.cause = cause;
  }
}
