import { body } from 'express-validator';

const notesPostSchema = [
  body('note').notEmpty().withMessage('Note is required'),
  body('hash').notEmpty().withMessage('Hash is required'),
];

const notesPatchSchema = [
  body('note').notEmpty().withMessage('Note is required'),
  body('previousHash').notEmpty().withMessage('Previous hash is required'),
  body('hash').notEmpty().withMessage('Hash is required'),
];

export { notesPostSchema, notesPatchSchema };
