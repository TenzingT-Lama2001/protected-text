import Note from '@model/note.model';
import { ProtectedTextServer } from '@src/index';
import mongoose from 'mongoose';
// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'supertest';

jest.mock('../../model/note.model');
describe('NoteRoutes', () => {
  const server = new ProtectedTextServer();
  const { app } = server;
  const mockNote = {
    _id: '64df237223433eb06a246ef3',
    noteId: 'site222',
    hash: 'previousHash',
    note: 'encrypted note',
    __v: 0,
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('Get Note', () => {
    it('should return a note from given noteId', async () => {
      // Arrange
      const noteId = 'site222';
      const spyFindOne = jest.spyOn(Note, 'findOne');
      const spyFindOneValue = spyFindOne.mockResolvedValueOnce(mockNote);

      // Act
      await request(app).get(`/api/v1/notes/${noteId}`).expect(200);

      // Assert
      expect(spyFindOneValue).toHaveBeenCalledWith({ noteId });
    });
    it('should return 404 and throw error if note with given noteId is not found', async () => {
      // Arrange
      const noteId = 'site222';
      const spyFindOne = jest.spyOn(Note, 'findOne');
      const spyFindOneValue = spyFindOne.mockResolvedValueOnce(null);
      type TResponseBody = {
        name: string;
        message: string;
      };
      // Act
      const response = await request(app).get(`/api/v1/notes/${noteId}`).expect(404);
      const { name, message } = response.body as TResponseBody;
      // Assert
      expect(spyFindOneValue).toHaveBeenCalledWith({ noteId });
      expect(name).toBe('Error');
      expect(message).toBe('No notes found');
    });
  });

  describe('Post Note', () => {
    const note = 'encryptedNote';
    const noteId = 'site';
    const hash = 'myHash';
    it('should return the posted note', async () => {
      // Arrange=

      const createMockNote = {
        _id: new mongoose.Types.ObjectId('64df237223433eb06a246ef3'),
        noteId: 'site222xi',
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

      expect(Note.create).toHaveBeenCalledWith({ noteId, note, hash });
    });

    it('should throw validation error if request is missing something', async () => {
      const mockRequest = {
        note,
        noteId,
      };

      type TResponseBody = {
        name: string;
        message: string;
        details: [
          {
            type: string;
            msg: string;
            path: string;
            location: string;
          },
        ];
        cause: string;
      };

      // Act
      const response = await request(app).post('/api/v1/notes').send(mockRequest).expect(400);
      const { name, message, details, cause } = response.body as TResponseBody;

      // Assert
      expect(name).toBe('ValidationError');
      expect(message).toBe(
        'Oops! There seems to be an issue with your input. Please review and correct the highlighted field.',
      );
      expect(details[0].msg).toBe('Hash is required');
      expect(cause).toBe('VALIDATION_ERROR');
    });
  });

  describe('Delete Note', () => {
    it('should delete the note', async () => {
      // Arrange
      const noteId = 'site222';
      const spyFindOne = jest.spyOn(Note, 'findOneAndDelete');
      const spyFindOneValue = spyFindOne.mockResolvedValueOnce(mockNote);

      // Act
      await request(app).delete(`/api/v1/notes/${noteId}`).expect(204);

      // Assert
      expect(spyFindOneValue).toHaveBeenCalledWith({ noteId });
    });
    it('should set header x-resource-not-found to true if note is not found', async () => {
      // Arrange
      const noteId = 'site222';
      const spyFindOne = jest.spyOn(Note, 'findOneAndDelete');
      const spyFindOneValue = spyFindOne.mockResolvedValueOnce(null);

      // Act
      const response = await request(app).delete(`/api/v1/notes/${noteId}`).expect(204);

      // Assert
      expect(spyFindOneValue).toHaveBeenCalledWith({ noteId });
      expect(response.header).toHaveProperty('x-resource-not-found', 'true');
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

      const spyFindOne = jest.spyOn(Note, 'findOne').mockResolvedValue(mockNote);
      const spyUpdate = jest.spyOn(Note, 'findOneAndUpdate').mockResolvedValue(updatedNote);

      type TResponseBody = {
        note: {
          _id: string;
          noteId: string;
          note: string;
          hash: string;
          __v: number;
        };
      };
      // Act
      const response = await request(app).patch(`/api/v1/notes/${noteId}`).send(mockRequest).expect(200);
      const { note: responseNote } = response.body as TResponseBody;
      expect(spyFindOne).toHaveBeenCalledWith({ noteId });
      expect(spyUpdate).toHaveBeenCalledWith(
        { noteId },
        { $set: { note: updatedNote.note, hash: updatedNote.hash } },
        { new: true },
      );
      expect(responseNote).toEqual(updatedNote);
    });
    it('should return 404 if the note is not found', async () => {
      // Arrange
      const mockRequest = {
        previousHash: hash,
        note: updatedNote.note,
        hash: updatedNote.hash,
      };

      const spyFindOne = jest.spyOn(Note, 'findOne').mockResolvedValue(null);
      type TResponseBody = {
        name: string;
        message: string;
      };
      // Act
      const response = await request(app).patch(`/api/v1/notes/${noteId}`).send(mockRequest).expect(404);
      const { name, message } = response.body as TResponseBody;

      // Assert
      expect(spyFindOne).toHaveBeenCalledWith({ noteId });
      expect(name).toEqual('Error');
      expect(message).toEqual('No notes found');
    });
    it('should return the same note if the new hash is same as old hash', async () => {
      // Arrange
      const mockRequest = {
        previousHash: hash,
        note: updatedNote.note,
        hash: mockNote.hash,
      };

      const spyFindOne = jest.spyOn(Note, 'findOne').mockResolvedValue(mockNote);

      type TResponseBody = {
        note: {
          _id: string;
          noteId: string;
          note: string;
          hash: string;
          __v: number;
        };
      };
      // Act
      const response = await request(app).patch(`/api/v1/notes/${noteId}`).send(mockRequest).expect(200);
      const { note: responseNote } = response.body as TResponseBody;
      expect(spyFindOne).toHaveBeenCalledWith({ noteId });
      expect(responseNote).toEqual(mockNote);
    });
    it('should throw validation error if request is missing something', async () => {
      // Arrange
      const mockRequest = {
        previousHash: hash,
        note: updatedNote.note,
      };

      type TResponseBody = {
        name: string;
        message: string;
        details: [
          {
            type: string;
            msg: string;
            path: string;
            location: string;
          },
        ];
        cause: string;
      };
      // Act
      const response = await request(app).patch(`/api/v1/notes/${noteId}`).send(mockRequest).expect(400);
      const { name, message, details, cause } = response.body as TResponseBody;

      // Assert
      expect(name).toBe('ValidationError');
      expect(message).toBe(
        'Oops! There seems to be an issue with your input. Please review and correct the highlighted field.',
      );
      expect(details[0].msg).toBe('Hash is required');
      expect(cause).toBe('VALIDATION_ERROR');
    });
  });
});
