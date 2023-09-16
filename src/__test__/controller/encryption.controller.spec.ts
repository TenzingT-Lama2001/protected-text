import { EncryptionController } from '@controller/encryption.controller';
import { TDecryptNote } from '@interface/encryption/encryption.interface';
import { EncryptionService } from '@service/encryption.service';
import { Request, Response } from 'express';

jest.mock('../../service/encryption.service');

describe('EncryptionController', () => {
  const note = 'note';
  const secretKey = 'secretKey';
  const noteId = 'noteId';

  describe('encrypt', () => {
    it('should encrypt the note and return encryptedNote and hash', () => {
      // Arrange
      const noteIdHash = 'noteIdHash';
      const encryptedNote = 'myEncryptedNote';
      const secretKeyHash = 'hashedSecretKey';
      const hash = 'myNoteHash';

      (EncryptionService.hash as jest.Mock)
        .mockReturnValueOnce('noteIdHash')
        .mockReturnValueOnce('hashedSecretKey')
        .mockReturnValue('myNoteHash');
      (EncryptionService.encrypt as jest.Mock).mockReturnValue('myEncryptedNote');

      const mockRequest = {
        body: {
          note,
          secretKey,
          noteId,
        },
      } as unknown as Request;

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      // Act
      EncryptionController.encrypt(mockRequest, mockResponse);

      // Assert
      expect(EncryptionService.hash).toHaveBeenCalledWith(noteId);
      expect(EncryptionService.encrypt).toHaveBeenCalledWith(note, secretKey, noteIdHash);
      expect(EncryptionService.hash).toHaveBeenCalledWith(secretKey);
      expect(EncryptionService.hash).toHaveBeenCalledWith(note + secretKeyHash);
      expect(EncryptionService.hash).toHaveBeenCalledTimes(3);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        note: encryptedNote,
        hash,
      });
    });
  });

  describe('decrypt', () => {
    const noteIdHash = 'noteIdHash';
    it('should return 401 with message if secret key is invalid', () => {
      // Arrange
      const errorMessage = 'Malformed UTF-8 data';
      const decrypt: TDecryptNote = {
        decryptedNote: null,
        message: errorMessage,
      };

      (EncryptionService.hash as jest.Mock).mockReturnValue(noteIdHash);
      (EncryptionService.decrypt as jest.Mock).mockReturnValue(decrypt);

      const mockRequest = {
        body: {
          note,
          secretKey,
          noteId,
        },
      } as unknown as Request;

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      // Act
      EncryptionController.decrypt(mockRequest, mockResponse);

      // Assert
      expect(EncryptionService.hash).toHaveBeenCalledWith(noteId);
      expect(EncryptionService.decrypt).toHaveBeenCalledWith(note, secretKey, noteIdHash);
      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: errorMessage,
      });
    });
    it('should return the decrypted note', () => {
      // Arrange
      const decrypt: TDecryptNote = {
        decryptedNote: 'decrypted note',
      };
      (EncryptionService.hash as jest.Mock).mockReturnValue(noteIdHash);
      (EncryptionService.decrypt as jest.Mock).mockReturnValue(decrypt);
      const mockRequest = {
        body: {
          note,
          secretKey,
          noteId,
        },
      } as unknown as Request;

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      // Act
      EncryptionController.decrypt(mockRequest, mockResponse);

      // Assert
      expect(EncryptionService.hash).toHaveBeenCalledWith(noteId);
      expect(EncryptionService.decrypt).toHaveBeenCalledWith(note, secretKey, noteIdHash);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ note: decrypt.decryptedNote });
    });
  });
});
