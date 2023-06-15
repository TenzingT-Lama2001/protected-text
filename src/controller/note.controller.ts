import { Request, Response } from 'express';
import { NoteService } from 'src/service/note.service';
import HTTP_STATUS from 'http-status-codes';

export class NoteController {
  public static async getNote(req: Request, res: Response) {
    const { id } = req.params;
    const fetchedNote = await NoteService.getNote(id);

    if (!fetchedNote) {
      res.status(404);
      throw new Error('No notes found');
    }
    res.status(HTTP_STATUS.OK).json({
      message: 'Fetched note',
      fetchedNote,
    });
  }

  public static async postNote(req: Request, res: Response) {
    const { note } = req.body;
    const createdNote = await NoteService.postNote(note);
    res.status(HTTP_STATUS.CREATED).json({
      message: 'Note created',
      createdNote,
    });
  }

  public static async deleteNote(req: Request, res: Response) {
    const { id } = req.params;
    const result = await NoteService.deleteNote(id);
    if (!result) {
      res.status(404);
      throw new Error('No notes found');
    }
    res.status(HTTP_STATUS.OK).json({ message: 'Note deleted' });
  }

  public static async updateNote(req: Request, res: Response) {
    const { id } = req.params;
    const { note } = req.body;
    const updatedNote = await NoteService.updateNote(id, note);
    if (!updatedNote) {
      res.status(404);
      throw new Error('No notes found');
    }
    res.status(HTTP_STATUS.OK).json({
      message: 'Note updated',
      updatedNote,
    });
  }
}
