import { TDecryptNote } from '@interface/encryption/encryption.interface';
import CryptoJS from 'crypto-js';

export class EncryptionService {
  public static encrypt(note: string, secretKey: string, keyHash: string): string {
    // encrypt(content + keyHash, password)
    const encryptedNote = CryptoJS.AES.encrypt(String(note + keyHash), secretKey).toString();
    return encryptedNote;
  }

  public static decrypt(encryptedNote: string, secretKey: string, keyHash: string): TDecryptNote {
    let decryptedContent = '';
    let decryptedNote = '';

    try {
      decryptedContent = CryptoJS.AES.decrypt(encryptedNote, secretKey).toString(CryptoJS.enc.Utf8);
      if (decryptedContent.endsWith(keyHash)) {
        decryptedNote = decryptedContent.substring(0, decryptedContent.length - keyHash.length);
        return {
          decryptedNote,
        };
      }
    } catch (err: any) {
      return {
        decryptedNote: null,
        message: err.message,
      };
    }
    return {
      decryptedNote: null,
    };
  }

  public static hash(payload: string): string {
    return CryptoJS.SHA512(payload).toString();
  }
}
