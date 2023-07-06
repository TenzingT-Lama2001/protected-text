import express, { Router } from 'express';
import { NoteController } from 'src/controller/note.controller';
import asyncHandler from 'express-async-handler';
import validateSchema from 'src/middleware/validation.middleware';
import notesSchema from 'src/schema/note.schema';

export class NoteRoutes {
  public router: Router = express.Router();

  constructor() {
    this.router.get('/:id', validateSchema(notesSchema.get, 'params'), asyncHandler(NoteController.getNote));
    this.router.post('/', validateSchema(notesSchema.post, 'body'), asyncHandler(NoteController.postNote));
    this.router.delete('/:id', validateSchema(notesSchema.delete, 'query'), asyncHandler(NoteController.deleteNote));
    this.router.patch('/:id', validateSchema(notesSchema.patch, 'body'), asyncHandler(NoteController.updateNote));
  }
}
