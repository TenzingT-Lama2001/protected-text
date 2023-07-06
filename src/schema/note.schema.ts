import Joi from 'joi';

const notesSchema = {
  post: Joi.object().keys({
    note: Joi.string().required(),
    hash: Joi.string().required(),
  }),

  get: Joi.object().keys({
    id: Joi.string().required(),
  }),

  patch: Joi.object().keys({
    note: Joi.string().required(),
    previousHash: Joi.string().required(),
    hash: Joi.string().required(),
  }),

  delete: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

export default notesSchema;
