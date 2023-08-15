import { body } from 'express-validator';

const encryptionDecryptionSchema = [
  body('note').notEmpty().withMessage('Note is required'),
  body('secretKey').notEmpty().withMessage('Secret Key is required'),
  body('key').notEmpty().withMessage('Key is required'),
];

export { encryptionDecryptionSchema };
