import Joi from 'joi';

const encryptionSchema = {
  encrypt: Joi.object().keys({
    note: Joi.string().required(),
    secretKey: Joi.string().required(),
  }),

  decrypt: Joi.object().keys({
    note: Joi.string().required(),
    secretKey: Joi.string().required(),
  }),
};

export default encryptionSchema;
