import { INoteDocument } from '@interface/note/note.interface';
import Note from '@model/note.model';
import { NoteService } from '@service/note.service';
import { ProtectedTextServer } from '@src/index';
// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'supertest';

const server = new ProtectedTextServer();
const { app } = server;
jest.mock('../../model/note.model');
describe('NoteRoutes', () => {
  const mockNote = {
    _id: '64df237223433eb06a246ef3',
    noteId: 'site222',
    hash: 'previousHash',
    note: 'encrypted note',
    __v: 0,
  } as INoteDocument;

  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('Get Note', () => {
    it('should return a note from given noteId', async () => {
      // Arrange
      const noteId = 'site222';
      jest.spyOn(NoteService, 'getNote').mockResolvedValueOnce(mockNote);

      // Act and Assert
      await request(app).get(`/api/v1/notes/${noteId}`).expect(200);
    });

    it('should return 404 and throw error if note with given noteId is not found', async () => {
      // Arrange
      const noteId = 'site222';
      jest.spyOn(NoteService, 'getNote').mockResolvedValueOnce(null);

      // Act and Assert
      await request(app).get(`/api/v1/notes/${noteId}`).expect(404);
    });
  });

  describe('Post Note', () => {
    const note = 'encryptedNote';
    const noteId = 'site';
    const hash = 'myHash';
    it('should return the posted note', async () => {
      // Arrange=

      const createMockNote = {
        _id: '64df237223433eb06a246ef3',
        noteId: 'site222',
        hash: 'previousHash',
        note: 'encrypted note',
        __v: 0,
        toObject: jest.fn(),
      };
      (Note.create as jest.Mock).mockResolvedValueOnce(createMockNote);

      const mockRequest = {
        note,
        hash,
        noteId,
      };
      await request(app).post('/api/v1/notes').send(mockRequest).expect(201);
    });

    it('should throw validation error if request is missing something', async () => {
      // Arrange
      const mockRequest = {
        note,
        noteId,
      };

      // Act and Assert
      await request(app).post('/api/v1/notes').send(mockRequest).expect(400);
    });
  });

  describe('Delete Note', () => {
    it('should delete the note', async () => {
      // Arrange
      const noteId = 'site222';
      jest.spyOn(Note, 'findOneAndDelete').mockResolvedValueOnce(mockNote);

      // Act and Assert
      await request(app).delete(`/api/v1/notes/${noteId}`).expect(204);
    });

    it('should set header x-resource-not-found to true if note is not found', async () => {
      // Arrange
      const noteId = 'site222';
      jest.spyOn(Note, 'findOneAndDelete').mockResolvedValueOnce(null);

      // Act and Assert
      await request(app).delete(`/api/v1/notes/${noteId}`).expect(204);
    });
  });

  describe('Update Note', () => {
    const noteId = 'site222';
    const hash = 'previousHash';

    const updatedNote = {
      _id: '64df237223433eb06a246ef3',
      noteId: 'site222',
      note: 'U2FsdGVkX19XmKyA1yFs4dZwqXeCOMl6MDve+LVVmVPk0gbILsAlQOB25y1nELqriOGk9PGt0zW4dff2H2dP+xxF+TjXg+hvlpBoPe0EmYQM/EJHpRJz5dmTfboKFqgu82O60B3Y0NTk92DEcs3zAyoqHsjDX0nIitinF5iUexsMg9XWTcAKYbVUzJg3DBwjgblF+ergrP0phQWTwTDXNcbdIMP6cBvw0iVmG0qZktY=',
      hash: '0a2c4f4bb995c681da396abf0982e9fe2bc110ebad10ffcf327d7158963b3b12f96a9f8d584739cbb7edea256729f09a03b8c7ed826c3bb09acf056db539e2a8',
      __v: 0,
    };

    it('should update the note', async () => {
      // Arrange
      const mockRequest = {
        previousHash: hash,
        note: updatedNote.note,
        hash: updatedNote.hash,
      };

      jest.spyOn(Note, 'findOne').mockResolvedValue(mockNote);
      jest.spyOn(Note, 'findOneAndUpdate').mockResolvedValue(updatedNote);

      // Act
      await request(app).patch(`/api/v1/notes/${noteId}`).send(mockRequest).expect(200);
    });

    it('should return 404 if the note is not found', async () => {
      // Arrange
      const mockRequest = {
        previousHash: hash,
        note: updatedNote.note,
        hash: updatedNote.hash,
      };

      jest.spyOn(Note, 'findOne').mockResolvedValue(null);

      // Act
      await request(app).patch(`/api/v1/notes/${noteId}`).send(mockRequest).expect(404);
    });

    it('should return the same note if the new hash is same as old hash', async () => {
      // Arrange
      const mockRequest = {
        previousHash: hash,
        note: updatedNote.note,
        hash: mockNote.hash,
      };
      jest.spyOn(Note, 'findOne').mockResolvedValue(mockNote);

      // Act and Assert
      await request(app).patch(`/api/v1/notes/${noteId}`).send(mockRequest).expect(200);
    });

    it('should throw validation error if request is missing something', async () => {
      // Arrange
      const mockRequest = {
        previousHash: hash,
        note: updatedNote.note,
      };

      // Act and Assert
      await request(app).patch(`/api/v1/notes/${noteId}`).send(mockRequest).expect(400);
    });
  });
});
