import { TDecryptNote } from '@interface/encryption/encryption.interface';
import CryptoJS from 'crypto-js';

export class EncryptionService {
  public static encrypt(note: string, secretKey: string, noteIdHash: string): string {
    // encrypt(content + noteIdHash, password)
    const encryptedNote = CryptoJS.AES.encrypt(String(note + noteIdHash), secretKey).toString();
    return encryptedNote;
  }

  public static decrypt(encryptedNote: string, secretKey: string, noteIdHash: string): TDecryptNote {
    let decryptedContent = '';
    let decryptedNote = '';
    const decryptErrorMessage = 'Could not decrypt';
    try {
      decryptedContent = CryptoJS.AES.decrypt(encryptedNote, secretKey).toString(CryptoJS.enc.Utf8);
      if (decryptedContent.endsWith(noteIdHash)) {
        decryptedNote = decryptedContent.substring(0, decryptedContent.length - noteIdHash.length);
        return {
          decryptedNote,
        };
      }
    } catch (err) {
      return {
        decryptedNote: null,
        message: decryptErrorMessage,
      };
    }
    return {
      decryptedNote: null,
      message: decryptErrorMessage,
    };
  }

  public static hash(payload: string): string {
    return CryptoJS.SHA512(payload).toString();
  }
}
