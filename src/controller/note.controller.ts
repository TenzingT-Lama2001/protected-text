import { NextFunction, Request, Response } from 'express';
import { NoteService } from 'src/service/note.service';
import { StatusCodes as HTTP_STATUS, ReasonPhrases } from 'http-status-codes';

export class NoteController {
  public static async getNote(req: Request, res: Response) {
    const { id } = req.params;
    const note = await NoteService.getNote(id);

    if (!note) {
      res.status(404);
      throw new Error('No notes found');
    }
    res.status(HTTP_STATUS.OK).json({
      note,
    });
  }

  public static async postNote(req: Request, res: Response) {
    const { note, hash, id } = req.body;
    const newNote = await NoteService.postNote(id, note, hash);
    res.status(HTTP_STATUS.CREATED).json({
      note: newNote,
    });
  }

  public static async deleteNote(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const result = await NoteService.deleteNote(id);
    if (!result) {
      res.set('x-resource-not-found', 'true');
    }

    res.status(HTTP_STATUS.NO_CONTENT).end();
  }

  public static async updateNote(req: Request, res: Response) {
    const { id } = req.params;
    const { note, previousHash, hash } = req.body;
    const existingNote = await NoteService.getNote(id);
    if (existingNote?.hash !== previousHash) {
      res.status(HTTP_STATUS.FORBIDDEN);
      throw new Error(ReasonPhrases.FORBIDDEN);
    }
    if (existingNote?.hash === previousHash) {
      res.status(HTTP_STATUS.OK).json({
        note: existingNote,
      });
    }
    const updatedNote = await NoteService.updateNote(id, note, hash);
    if (!updatedNote) {
      res.status(404);
      throw new Error('No notes found');
    }
    res.status(HTTP_STATUS.OK).json({
      note: updatedNote,
    });
  }
}
