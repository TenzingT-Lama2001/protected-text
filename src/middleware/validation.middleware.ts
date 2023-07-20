import { NextFunction, Request, Response } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import HTTP_STATUS from 'http-status-codes';

const validateSchema = (schema: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const promises = [];
    for (let i = 0; i < schema.length; i += 1) {
      promises.push(schema[i].run(req));
    }
    await Promise.all(promises);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMsg = errors
        .array()
        .map((err) => err.msg)
        .toString();
      res.status(HTTP_STATUS.BAD_REQUEST);
      return next(new Error(errorMsg));
    }
    return next();
  };
};
export default validateSchema;
