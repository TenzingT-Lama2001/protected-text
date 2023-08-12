import { NextFunction, Request, Response } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { ValidationError } from 'src/error/validation.error';

const validateSchema = (schema: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const promises = [];
    for (let i = 0; i < schema.length; i += 1) {
      promises.push(schema[i].run(req));
    }
    await Promise.all(promises);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorDetails = errors.array() as [];
      const validationErrorResponse = new ValidationError(errorDetails);
      return next(validationErrorResponse);
    }
    return next();
  };
};

export default validateSchema;
