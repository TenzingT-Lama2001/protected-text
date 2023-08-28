import { NoteService } from '@service/note.service';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes as HTTP_STATUS, ReasonPhrases } from 'http-status-codes';

export class NoteController {
  public static async getNote(req: Request, res: Response) {
    const { noteId } = req.params;
    const note = await NoteService.getNote(noteId);

    if (!note) {
      res.status(404);
      throw new Error('No notes found');
    }
    res.status(HTTP_STATUS.OK).json({
      note,
    });
  }

  public static async postNote(req: Request, res: Response) {
    const { note, hash, noteId } = req.body;
    const newNote = await NoteService.postNote(noteId, note, hash);
    res.status(HTTP_STATUS.CREATED).json({
      note: newNote,
    });
  }

  public static async deleteNote(req: Request, res: Response, _next: NextFunction) {
    const { noteId } = req.params;
    const result = await NoteService.deleteNote(noteId);
    if (!result) {
      res.set('x-resource-not-found', 'true');
    }

    res.status(HTTP_STATUS.NO_CONTENT).end();
  }

  public static async updateNote(req: Request, res: Response) {
    const { noteId } = req.params;
    const { note, previousHash, hash } = req.body;
    const existingNote = await NoteService.getNote(noteId);
    if (existingNote?.hash !== previousHash) {
      res.status(HTTP_STATUS.FORBIDDEN);
      throw new Error(ReasonPhrases.FORBIDDEN);
    }
    if (existingNote?.hash === previousHash) {
      res.status(HTTP_STATUS.OK).json({
        note: existingNote,
      });
    }
    const updatedNote = await NoteService.updateNote(noteId, note, hash);
    if (!updatedNote) {
      res.status(404);
      throw new Error('No notes found');
    }
    res.status(HTTP_STATUS.OK).json({
      note: updatedNote,
    });
  }
}
