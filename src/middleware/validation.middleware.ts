import { NextFunction, Request, Response } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import asyncHandler from 'express-async-handler';
import HTTP_STATUS from 'http-status-codes';

const validateSchema = (schema: ValidationChain[]) => {
  return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const validationPromises = schema.map((validation) => validation.run(req));
    const validationResults = await Promise.all(validationPromises);

    const hasErrors = validationResults.some((result) => !result.isEmpty());
    if (hasErrors) {
      const errors = validationResult(req);
      const errorMsg = errors
        .array()
        .map((err) => err.msg)
        .toString();
      res.status(HTTP_STATUS.BAD_REQUEST);
      throw new Error(errorMsg);
    }

    next();
  });
};
export default validateSchema;
