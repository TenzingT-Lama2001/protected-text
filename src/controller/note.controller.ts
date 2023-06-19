import { NextFunction, Request, Response } from 'express';
import { NoteService } from 'src/service/note.service';
import HTTP_STATUS from 'http-status-codes';

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
    const { newNote } = req.body;
    const note = await NoteService.postNote(newNote);
    res.status(HTTP_STATUS.CREATED).json({
      note,
    });
  }

  public static async deleteNote(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const result = await NoteService.deleteNote(id);
    if (!result) {
      const error = new Error('No notes found');
      throw error;
    }

    res.status(HTTP_STATUS.OK);
  }

  public static async updateNote(req: Request, res: Response) {
    const { id } = req.params;
    const { updateNote } = req.body;
    const note = await NoteService.updateNote(id, updateNote);
    if (!note) {
      res.status(404);
      throw new Error('No notes found');
    }
    res.status(HTTP_STATUS.OK).json({
      note,
    });
  }
}
