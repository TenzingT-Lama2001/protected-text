import { EncryptionController } from '@controller/encryption.controller';
import { TDecryptNote, decrypt, encrypt, hash } from 'encryption-handler';
import { Request, Response } from 'express';

jest.mock('encryption-handler');
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
      const hashed = 'myNoteHash';

      (hash as jest.Mock)
        .mockReturnValueOnce('noteIdHash')
        .mockReturnValueOnce('hashedSecretKey')
        .mockReturnValue('myNoteHash');
      (encrypt as jest.Mock).mockReturnValue('myEncryptedNote');

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
      expect(hash).toHaveBeenCalledWith(noteId);
      expect(encrypt).toHaveBeenCalledWith(note, secretKey, noteIdHash);
      expect(hash).toHaveBeenCalledWith(secretKey);
      expect(hash).toHaveBeenCalledWith(note + secretKeyHash);
      expect(hash).toHaveBeenCalledTimes(3);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        note: encryptedNote,
        hash: hashed,
      });
    });
  });

  describe('decrypt', () => {
    const noteIdHash = 'noteIdHash';
    it('should return 401 with message if secret key is invalid', () => {
      // Arrange
      const errorMessage = 'Malformed UTF-8 data';
      const decrypted: TDecryptNote = {
        decryptedNote: null,
        message: errorMessage,
      };

      (hash as jest.Mock).mockReturnValue(noteIdHash);
      (decrypt as jest.Mock).mockReturnValue(decrypted);

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
      expect(hash).toHaveBeenCalledWith(noteId);
      expect(decrypt).toHaveBeenCalledWith(note, secretKey, noteIdHash);
      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: errorMessage,
      });
    });
    it('should return the decrypted note', () => {
      // Arrange
      const decrypted: TDecryptNote = {
        decryptedNote: 'decrypted note',
      };
      (hash as jest.Mock).mockReturnValue(noteIdHash);
      (decrypt as jest.Mock).mockReturnValue(decrypted);
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
      expect(hash).toHaveBeenCalledWith(noteId);
      expect(decrypt).toHaveBeenCalledWith(note, secretKey, noteIdHash);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ note: decrypted.decryptedNote });
    });
  });
});
