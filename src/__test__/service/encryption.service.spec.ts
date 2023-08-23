import { EncryptionService } from '@service/encryption.service';

jest.mock('../../service/encryption.service');

describe('EncryptionService', () => {
  describe('encrypt', () => {
    it('should encrypt the note', () => {
      // Arrange
      const note = 'myNote';
      const secretKey = 'mySecret123';
      const noteIdHash = 'myNoteIdHash';
      const mockEncryptedNote = 'myEncryptedNote';
      (EncryptionService.encrypt as jest.Mock).mockReturnValue(mockEncryptedNote);
      // Act
      const result = EncryptionService.encrypt(note, secretKey, noteIdHash);
      // Assert
      expect(result).toBe(mockEncryptedNote);
    });
  });
});
