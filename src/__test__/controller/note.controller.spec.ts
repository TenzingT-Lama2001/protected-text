import { NoteController } from '@controller/note.controller';
import { NoteService } from '@service/note.service';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

jest.mock('../../service/note.service');
describe('NoteController', () => {
  describe('getNote', () => {
    it('should return a note if it exists', async () => {
      // Arrange
      const mockNoteId = 'site222';
      const mockNote = {
        _id: new mongoose.Types.ObjectId('64df237223433eb06a246ef3'),
        noteId: 'site222',
        note: 'U2FsdGVkX19XmKyA1yFs4dZwqXeCOMl6MDve+LVVmVPk0gbILsAlQOB25y1nELqriOGk9PGt0zW4dff2H2dP+xxF+TjXg+hvlpBoPe0EmYQM/EJHpRJz5dmTfboKFqgu82O60B3Y0NTk92DEcs3zAyoqHsjDX0nIitinF5iUexsMg9XWTcAKYbVUzJg3DBwjgblF+ergrP0phQWTwTDXNcbdIMP6cBvw0iVmG0qZktY=',
        hash: '0a2c4f4bb995c681da396abf0982e9fe2bc110ebad10ffcf327d7158963b3b12f96a9f8d584739cbb7edea256729f09a03b8c7ed826c3bb09acf056db539e2a8',
        __v: 0,
      };

      (NoteService.getNote as jest.Mock).mockResolvedValue(mockNote);

      const mockRequest = {
        params: {
          noteId: mockNoteId,
        },
      } as unknown as Request;

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      // Act
      await NoteController.getNote(mockRequest, mockResponse);

      // Assert
      expect(NoteService.getNote).toHaveBeenCalledWith(mockNoteId);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ note: mockNote });
    });
    it('should return 404 if note is not found', async () => {
      // Arrange
      const mockNoteId = 'site222';

      (NoteService.getNote as jest.Mock).mockResolvedValue(null);
      const mockRequest = {
        params: {
          noteId: mockNoteId,
        },
      } as unknown as Request;

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      // Act
      try {
        await NoteController.getNote(mockRequest, mockResponse);
        throw new Error('Error did not hit');
      } catch (err) {
        // Assert
        const error = err as Error;
        expect(error.message).not.toEqual('Error did not hit');
        expect(error.message).toEqual('No notes found');
        expect(error).toHaveProperty('name');
        expect(error).toHaveProperty('message');
        expect(error).toHaveProperty('stack');
        expect(NoteService.getNote).toHaveBeenCalledWith(mockNoteId);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
      }
    });
  });
  describe('postNote', () => {
    it('should return the posted note', async () => {
      // Arrange
      const mockHash = 'mockHash';
      const mockNoteId = 'site222';
      const mockNote = 'myEncryptedNote';
      const mockNoteResponse = {
        _id: new mongoose.Types.ObjectId('64df237223433eb06a246ef3'),
        noteId: 'site222',
        note: 'U2FsdGVkX19XmKyA1yFs4dZwqXeCOMl6MDve+LVVmVPk0gbILsAlQOB25y1nELqriOGk9PGt0zW4dff2H2dP+xxF+TjXg+hvlpBoPe0EmYQM/EJHpRJz5dmTfboKFqgu82O60B3Y0NTk92DEcs3zAyoqHsjDX0nIitinF5iUexsMg9XWTcAKYbVUzJg3DBwjgblF+ergrP0phQWTwTDXNcbdIMP6cBvw0iVmG0qZktY=',
        hash: '0a2c4f4bb995c681da396abf0982e9fe2bc110ebad10ffcf327d7158963b3b12f96a9f8d584739cbb7edea256729f09a03b8c7ed826c3bb09acf056db539e2a8',
        __v: 0,
      };

      (NoteService.postNote as jest.Mock).mockResolvedValue(mockNoteResponse);

      const mockRequest = {
        body: {
          noteId: mockNoteId,
          note: mockNote,
          hash: mockHash,
        },
      } as unknown as Request;

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      // Act
      await NoteController.postNote(mockRequest, mockResponse);

      // Expect
      expect(NoteService.postNote).toHaveBeenCalledWith(mockNoteId, mockNote, mockHash);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({ note: mockNoteResponse });
    });
  });
  describe('deleteNote', () => {
    it('should return 204 if the note is deleted', async () => {
      // Arrange
      const mockNoteId = 'myNoteId';
      const mockNoteResponse = {
        _id: new mongoose.Types.ObjectId('64df237223433eb06a246ef3'),
        noteId: 'site222',
        note: 'U2FsdGVkX19XmKyA1yFs4dZwqXeCOMl6MDve+LVVmVPk0gbILsAlQOB25y1nELqriOGk9PGt0zW4dff2H2dP+xxF+TjXg+hvlpBoPe0EmYQM/EJHpRJz5dmTfboKFqgu82O60B3Y0NTk92DEcs3zAyoqHsjDX0nIitinF5iUexsMg9XWTcAKYbVUzJg3DBwjgblF+ergrP0phQWTwTDXNcbdIMP6cBvw0iVmG0qZktY=',
        hash: '0a2c4f4bb995c681da396abf0982e9fe2bc110ebad10ffcf327d7158963b3b12f96a9f8d584739cbb7edea256729f09a03b8c7ed826c3bb09acf056db539e2a8',
        __v: 0,
      };

      (NoteService.deleteNote as jest.Mock).mockResolvedValue(mockNoteResponse);

      const mockRequest = {
        params: {
          noteId: mockNoteId,
        },
      } as unknown as Request;
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        end: jest.fn(),
      } as unknown as Response;

      // Act
      await NoteController.deleteNote(mockRequest, mockResponse);

      // Assert
      expect(NoteService.deleteNote).toHaveBeenCalledWith(mockNoteId);
      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.end).toBeCalledTimes(1);
    });
    it('should set x-resource-not-found to true in response header', async () => {
      const mockNoteId = 'myNoteId';

      (NoteService.deleteNote as jest.Mock).mockResolvedValue(null);

      const mockRequest = {
        params: {
          noteId: mockNoteId,
        },
      } as unknown as Request;
      const mockResponse = {
        set: jest.fn(),
        status: jest.fn().mockReturnThis(),
        end: jest.fn(),
      } as unknown as Response;

      // Act
      await NoteController.deleteNote(mockRequest, mockResponse);

      // Assert
      expect(NoteService.deleteNote).toHaveBeenCalledWith(mockNoteId);
      expect(mockResponse.set).toHaveBeenCalledWith('x-resource-not-found', 'true');
      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.end).toBeCalledTimes(1);
    });
  });
  describe('updateNote', () => {
    it('should throw forbidden error if hash does not match', async () => {
      // Arrange
      const mockNoteId = 'myNoteId';
      const mockNote = 'myEncryptedNote';
      const mockPreviousHash = 'previousHash';
      const mockHash = 'hash';
      const mockNoteResponse = {
        _id: new mongoose.Types.ObjectId('64df237223433eb06a246ef3'),
        noteId: 'site222',
        note: 'U2FsdGVkX19XmKyA1yFs4dZwqXeCOMl6MDve+LVVmVPk0gbILsAlQOB25y1nELqriOGk9PGt0zW4dff2H2dP+xxF+TjXg+hvlpBoPe0EmYQM/EJHpRJz5dmTfboKFqgu82O60B3Y0NTk92DEcs3zAyoqHsjDX0nIitinF5iUexsMg9XWTcAKYbVUzJg3DBwjgblF+ergrP0phQWTwTDXNcbdIMP6cBvw0iVmG0qZktY=',
        hash: '0a2c4f4bb995c681da396abf0982e9fe2bc110ebad10ffcf327d7158963b3b12f96a9f8d584739cbb7edea256729f09a03b8c7ed826c3bb09acf056db539e2a8',
        __v: 0,
      };

      (NoteService.getNote as jest.Mock).mockResolvedValue(mockNoteResponse);

      const mockRequest = {
        params: {
          noteId: mockNoteId,
        },
        body: {
          note: mockNote,
          previousHash: mockPreviousHash,
          hash: mockHash,
        },
      } as unknown as Request;

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      // Act
      try {
        await NoteController.updateNote(mockRequest, mockResponse);
        throw new Error('Error did not hit');
      } catch (err) {
        // Assert
        const error = err as Error;
        expect(error.message).not.toEqual('Error did not hit');
        expect(error.message).toEqual('Forbidden');
        expect(error).toHaveProperty('name');
        expect(error).toHaveProperty('message');
        expect(error).toHaveProperty('stack');
        expect(NoteService.getNote).toHaveBeenCalledWith(mockNoteId);
        expect(mockResponse.status).toHaveBeenCalledWith(403);
      }
    });
    it('should return the same note if the note hash is equal to previous hash', async () => {
      // Arrange
      const mockNoteId = 'myNoteId';
      const mockNote = 'myEncryptedNote';
      const mockPreviousHash = 'previousHash';
      const mockHash = 'previousHash';
      const mockNoteResponse = {
        _id: new mongoose.Types.ObjectId('64df237223433eb06a246ef3'),
        noteId: 'site222',
        note: 'U2FsdGVkX19XmKyA1yFs4dZwqXeCOMl6MDve+LVVmVPk0gbILsAlQOB25y1nELqriOGk9PGt0zW4dff2H2dP+xxF+TjXg+hvlpBoPe0EmYQM/EJHpRJz5dmTfboKFqgu82O60B3Y0NTk92DEcs3zAyoqHsjDX0nIitinF5iUexsMg9XWTcAKYbVUzJg3DBwjgblF+ergrP0phQWTwTDXNcbdIMP6cBvw0iVmG0qZktY=',
        hash: 'previousHash',
        __v: 0,
      };

      (NoteService.getNote as jest.Mock).mockResolvedValue(mockNoteResponse);

      const mockRequest = {
        params: {
          noteId: mockNoteId,
        },
        body: {
          note: mockNote,
          previousHash: mockPreviousHash,
          hash: mockHash,
        },
      } as unknown as Request;

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      // Act
      await NoteController.updateNote(mockRequest, mockResponse);

      // Assert
      expect(NoteService.getNote).toHaveBeenCalledWith(mockNoteId);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ note: mockNoteResponse });
    });
    it('should update the note', async () => {
      // Arrange
      const mockNoteId = 'myNoteId';
      const mockNote = 'myEncryptedNote';
      const mockPreviousHash = 'previousHash';
      const mockHash = 'newHash';
      const mockNoteResponse = {
        _id: new mongoose.Types.ObjectId('64df237223433eb06a246ef3'),
        noteId: 'site222',
        hash: 'previousHash',
        note: 'encrypted note',
        __v: 0,
      };
      const mockUpdatedNote = {
        _id: new mongoose.Types.ObjectId('64df237223433eb06a246ef3'),
        noteId: 'site222',
        note: 'updated encrypted note',
        hash: mockHash,
        __v: 0,
      };
      (NoteService.getNote as jest.Mock).mockResolvedValue(mockNoteResponse);
      (NoteService.updateNote as jest.Mock).mockResolvedValue(mockUpdatedNote);

      const mockRequest = {
        params: {
          noteId: mockNoteId,
        },
        body: {
          note: mockNote,
          previousHash: mockPreviousHash,
          hash: mockHash,
        },
      } as unknown as Request;

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      // Act
      await NoteController.updateNote(mockRequest, mockResponse);

      // Assert
      expect(NoteService.getNote).toHaveBeenCalledWith(mockNoteId);
      expect(NoteService.updateNote).toHaveBeenCalledWith(mockNoteId, mockNote, mockHash);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ note: mockUpdatedNote });
    });
    it('should return 404 if note is not found', async () => {
      // Arrange
      const mockNoteId = 'myNoteId';
      const mockNote = 'myEncryptedNote';
      const mockPreviousHash = 'previousHash';
      const mockHash = 'newHash';

      (NoteService.getNote as jest.Mock).mockResolvedValue(null);

      const mockRequest = {
        params: {
          noteId: mockNoteId,
        },
        body: {
          note: mockNote,
          previousHash: mockPreviousHash,
          hash: mockHash,
        },
      } as unknown as Request;

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      // Act
      try {
        await NoteController.updateNote(mockRequest, mockResponse);
        throw new Error('Error did not hit');
      } catch (err) {
        // Assert
        const error = err as Error;
        expect(error.message).not.toEqual('Error did not hit');
        expect(error.message).toEqual('No notes found');
        expect(error).toHaveProperty('name');
        expect(error).toHaveProperty('message');
        expect(error).toHaveProperty('stack');
        expect(NoteService.getNote).toHaveBeenCalledWith(mockNoteId);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
      }
    });
  });
});
