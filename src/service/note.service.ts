import { INoteDocument, TDeleteNote, TGetNote, TPostNote, TUpdateNote } from '@interface/note/note.interface';
import Note from 'src/model/note.model';

export class NoteService {
  public static async getNote(key: string): TGetNote {
    const existingNote = (await Note.findOne({ key })) as INoteDocument;

    if (!existingNote) {
      return null;
    }

    return existingNote.toObject() as INoteDocument;
  }

  public static async postNote(key: string, note: string, hash: string): TPostNote {
    const newNote = await Note.create({ key, note, hash });

    return newNote.toObject() as INoteDocument;
  }

  public static async deleteNote(key: string): TDeleteNote {
    return Note.findOneAndDelete({ key });
  }

  public static async updateNote(key: string, note: string, hash: string): TUpdateNote {
    const existingNote = (await Note.findOne({ key })) as INoteDocument;

    if (!existingNote) {
      return null;
    }
    existingNote.note = note;
    existingNote.hash = hash;
    existingNote.save();
    return existingNote.toObject() as INoteDocument;
  }
}
