import { NextFunction, Request, Response } from 'express';
import { validationResult, ValidationChain } from 'express-validator';

const validateSchema = (schema: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Promise.all(schema.map((validation) => validation.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMsg = errors
          .array()
          .map((err) => err.msg)
          .toString();

        res.status(400);
        throw new Error(errorMsg);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
export default validateSchema;
