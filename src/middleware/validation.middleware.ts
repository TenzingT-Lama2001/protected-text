import { NextFunction, Request, Response } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import HTTP_STATUS from 'http-status-codes';
import asyncHandler from 'express-async-handler';
import { CustomError } from 'src/error/custom.error';

const validateSchema = (schema: ValidationChain[]) => {
  return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const promises = [];
    for (let i = 0; i < schema.length; i += 1) {
      promises.push(schema[i].run(req));
    }
    await Promise.all(promises);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorDetails = errors.array() as [];
      throw new CustomError('Validation Error', HTTP_STATUS.BAD_REQUEST, errorDetails);
    }
    return next();
  });
};
export default validateSchema;
