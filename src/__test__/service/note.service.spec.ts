import Note from '@model/note.model';
import { NoteService } from '@service/note.service';
import mongoose from 'mongoose';

jest.mock('../../model/note.model');
describe('NoteService', () => {
  const mockNote = {
    _id: new mongoose.Types.ObjectId('64df237223433eb06a246ef3'),
    noteId: 'site222',
    hash: 'previousHash',
    note: 'encrypted note',
    __v: 0,
  };
  describe('getNote', () => {
    const noteId = 'site222';
    const spyFindOne = jest.spyOn(Note, 'findOne');

    it('should return note if the note exist', async () => {
      // Arrange

      const spyFindOneValue = spyFindOne.mockResolvedValue(mockNote);
      // const spyFindOneValue = (Note.findOne as jest.Mock).mockResolvedValue(mockNote);

      // Act
      const result = await NoteService.getNote(noteId);

      // Assert
      expect(spyFindOneValue).toHaveBeenCalledWith({ noteId });
      expect(result).toBe(mockNote);
    });
    it('should return null if the note does not exist', async () => {
      // Arrange
      const spyFindOneValue = spyFindOne.mockResolvedValue(null);

      // Act
      const result = await NoteService.getNote(noteId);

      // Assert
      expect(spyFindOneValue).toHaveBeenCalledWith({ noteId });
      expect(result).toBe(null);
    });
  });

  describe('postNote', () => {
    it('should return the created note', async () => {
      // Arrange
      const note = 'encryptedNote';
      const noteId = 'site';
      const hash = 'myHash';
      const createMockNote = {
        _id: new mongoose.Types.ObjectId('64df237223433eb06a246ef3'),
        noteId: 'site222',
        hash: 'previousHash',
        note: 'encrypted note',
        __v: 0,
        toObject: jest.fn(),
      };
      (Note.create as jest.Mock).mockResolvedValueOnce(createMockNote);
      // const spyCreate = jest.spyOn(Note, 'create').mockResolvedValue(createMockNote);

      // Act
      await NoteService.postNote(noteId, note, hash);

      // Assert
      expect(Note.create).toHaveBeenCalledWith({ noteId, note, hash });
      expect(createMockNote.toObject).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteNote', () => {
    it('should delete the note', async () => {
      // Arrange
      const noteId = 'site';
      const spyDelete = jest.spyOn(Note, 'findOneAndDelete').mockResolvedValue(null);

      // Act
      const result = await NoteService.deleteNote(noteId);

      // Assert
      expect(spyDelete).toHaveBeenCalledWith({ noteId });
      expect(result).toBe(null);
    });
  });

  describe('updateNote', () => {
    it('should find and update the note', async () => {
      // Arrange
      const noteId = 'noteId';
      const note = 'myEncryptedNote';
      const hash = 'myHash';
      const spyUpdate = jest.spyOn(Note, 'findOneAndUpdate').mockResolvedValue(mockNote);

      // Act
      const result = await NoteService.updateNote(noteId, note, hash);

      // Assert
      expect(spyUpdate).toHaveBeenCalledWith({ noteId }, { $set: { note, hash } }, { new: true });
      expect(result).toBe(mockNote);
    });
  });
});
