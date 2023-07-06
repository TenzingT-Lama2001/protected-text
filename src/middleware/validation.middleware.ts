import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

type PropertyType = 'body' | 'params' | 'query';
const validateSchema = (schema: Joi.Schema, property: PropertyType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property]);
    const valid = error == null;

    if (valid) next();
    else {
      const { details } = error;
      const message = details.map((i) => i.message).join(',');
      res.status(422).json({ error: message });
    }
  };
};

export default validateSchema;
