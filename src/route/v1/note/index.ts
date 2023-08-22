import { NoteController } from '@controller/note.controller';
import express, { Router } from 'express';
import asyncHandler from 'express-async-handler';
import validateSchema from 'src/middleware/validation.middleware';
import { notesPatchSchema, notesPostSchema } from 'src/schema/note.schema';

export class NoteRoutes {
  public router: Router = express.Router();

  constructor() {
    this.router.get('/:noteId', asyncHandler(NoteController.getNote));
    this.router.post('/', validateSchema(notesPostSchema), asyncHandler(NoteController.postNote));
    this.router.delete('/:noteId', asyncHandler(NoteController.deleteNote));
    this.router.patch('/:noteId', validateSchema(notesPatchSchema), asyncHandler(NoteController.updateNote));
  }
}
