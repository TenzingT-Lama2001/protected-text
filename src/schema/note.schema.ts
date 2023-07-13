import { body, param } from 'express-validator';

const commonSchema = param('id').notEmpty().withMessage('ID is required');

const notesGetSchema = [commonSchema];

const notesDeleteSchema = [commonSchema];

const notesPostSchema = [
  body('note').notEmpty().withMessage('Note is required'),
  body('hash').notEmpty().withMessage('Hash is required'),
];

const notesPatchSchema = [
  body('note').notEmpty().withMessage('Note is required'),
  body('previousHash').notEmpty().withMessage('Previous hash is required'),
  body('hash').notEmpty().withMessage('Hash is required'),
];

export { notesGetSchema, notesDeleteSchema, notesPostSchema, notesPatchSchema };
