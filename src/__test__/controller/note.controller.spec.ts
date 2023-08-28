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
});
