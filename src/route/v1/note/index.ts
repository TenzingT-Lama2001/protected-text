import express, { Router } from 'express';
import { NoteController } from 'src/controller/note.controller';
import asyncHandler from 'express-async-handler';
import validateSchema from 'src/middleware/validation.middleware';
import { notesDeleteSchema, notesGetSchema, notesPatchSchema, notesPostSchema } from 'src/schema/note.schema';

export class NoteRoutes {
  public router: Router = express.Router();

  constructor() {
    this.router.get('/:id', validateSchema(notesGetSchema), asyncHandler(NoteController.getNote));
    this.router.post('/', validateSchema(notesPostSchema), asyncHandler(NoteController.postNote));
    this.router.delete('/:id', validateSchema(notesDeleteSchema), asyncHandler(NoteController.deleteNote));
    this.router.patch('/:id', validateSchema(notesPatchSchema), asyncHandler(NoteController.updateNote));
  }
}
