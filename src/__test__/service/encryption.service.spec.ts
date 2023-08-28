import { EncryptionService } from '@service/encryption.service';
import CryptoJS from 'crypto-js';

describe('EncryptionService', () => {
  describe('encrypt', () => {
    it('should encrypt the note', () => {
      // Arrange
      const note = 'myNote';
      const secretKey = 'mySecret123';
      const noteIdHash = 'myNoteIdHash';
      const encryptSpy = jest.spyOn(CryptoJS.AES, 'encrypt');
      // Act
      EncryptionService.encrypt(note, secretKey, noteIdHash);
      // Assert
      expect(encryptSpy).toHaveBeenCalledWith(String(note + noteIdHash), secretKey);
    });
  });
});
