import { StatusCodes as HTTP_STATUS } from 'http-status-codes';

export class CustomError extends Error {
  constructor(public message: string, public statusCode: HTTP_STATUS, public details: [], public cause?: string) {
    super(message);
  }
}
