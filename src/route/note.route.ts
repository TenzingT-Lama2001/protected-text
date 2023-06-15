import express, { Router } from 'express';
import { NoteController } from 'src/controller/note.controller';
import asyncHandler from 'express-async-handler';

export class NoteRoutes {
  private router: Router = express.Router();

  public routes(): Router {
    this.router.get('/note/:id', asyncHandler(NoteController.getNote));
    this.router.post('/note', asyncHandler(NoteController.postNote));
    this.router.delete('/note/:id', asyncHandler(NoteController.deleteNote));
    this.router.patch('/note/:id', asyncHandler(NoteController.updateNote));
    return this.router;
  }
}
