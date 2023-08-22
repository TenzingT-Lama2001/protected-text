import { INoteDocument, TDeleteNote, TGetNote, TPostNote, TUpdateNote } from '@interface/note/note.interface';
import Note from '@model/note.model';

export class NoteService {
  public static async getNote(noteId: string): TGetNote {
    const existingNote = (await Note.findOne({ noteId })) as INoteDocument;

    if (!existingNote) {
      return null;
    }

    return existingNote.toObject() as INoteDocument;
  }

  public static async postNote(noteId: string, note: string, hash: string): TPostNote {
    const newNote = await Note.create({ noteId, note, hash });

    return newNote.toObject() as INoteDocument;
  }

  public static async deleteNote(noteId: string): TDeleteNote {
    return Note.findOneAndDelete({ noteId });
  }

  public static async updateNote(noteId: string, note: string, hash: string): TUpdateNote {
    const existingNote = (await Note.findOne({ noteId })) as INoteDocument;

    if (!existingNote) {
      return null;
    }
    existingNote.note = note;
    existingNote.hash = hash;
    existingNote.save();
    return existingNote.toObject() as INoteDocument;
  }
}
