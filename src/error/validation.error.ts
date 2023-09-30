import { StatusCodes as HTTP_STATUS } from 'http-status-codes';
import { CustomError } from './custom.error';
import { errorList } from './constant';

const {
  validation: { message: defaultMessage, cause },
} = errorList;

export class ValidationError extends CustomError {
  constructor(details: [] = [], message: string = defaultMessage) {
    super(message, details, cause, HTTP_STATUS.BAD_REQUEST);
    this.name = this.constructor.name;
  }
}
