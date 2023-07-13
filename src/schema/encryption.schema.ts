import { body } from 'express-validator';

const commonSchema = [
  body('note').notEmpty().withMessage('Note is required'),
  body('secretKey').notEmpty().withMessage('Secret Key is required'),
];

const encryptionSchema = commonSchema;

const decryptionSchema = commonSchema;

export { encryptionSchema, decryptionSchema };
