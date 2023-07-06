import express, { Router } from 'express';
import { NoteController } from 'src/controller/note.controller';
import asyncHandler from 'express-async-handler';

export class NoteRoutes {
  public router: Router = express.Router();

  constructor() {
    this.router.get('/:id', asyncHandler(NoteController.getNote));
    this.router.post('/', asyncHandler(NoteController.postNote));
    this.router.delete('/:id', asyncHandler(NoteController.deleteNote));
    this.router.patch('/:id', asyncHandler(NoteController.updateNote));
  }
}
