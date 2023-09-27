import { body } from 'express-validator';

const encryptionDecryptionSchema = [
  body('note').notEmpty().withMessage('Note is required'),
  body('secretKey').notEmpty().withMessage('Secret Key is required'),
  body('noteId').notEmpty().withMessage('Note Id is required'),
];

export { encryptionDecryptionSchema };
