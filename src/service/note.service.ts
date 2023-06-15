import { INoteDocument, TDeleteNote, TGetNote, TPostNote, TUpdateNote } from '@interface/note/note.interface';
import Note from 'src/model/note.model';

export class NoteService {
  public static async getNote(id: string): TGetNote {
    const existingNote = (await Note.findById(id)) as INoteDocument;

    if (!existingNote) {
      return null;
    }

    return existingNote.toObject() as INoteDocument;
  }

  public static async postNote(note: string): TPostNote {
    const newNote = await Note.create({ note });

    return newNote.toObject() as INoteDocument;
  }

  public static async deleteNote(id: string): TDeleteNote {
    const existingNote = (await Note.findById(id)) as INoteDocument;

    if (!existingNote) {
      return null;
    }

    return Note.findByIdAndDelete(id);
  }

  public static async updateNote(id: string, note: string): TUpdateNote {
    const existingNote = (await Note.findById(id)) as INoteDocument;

    if (!existingNote) {
      return null;
    }

    existingNote.note = note;
    existingNote.save();
    return existingNote.toObject() as INoteDocument;
  }
}
