import CryptoJS from 'crypto-js';

export type TDecryptNote = {
  decryptedNote: string | null;
};

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
      if (decryptedContent.indexOf(keyHash, decryptedContent.length - keyHash.length) !== -1) {
        decryptedNote = decryptedContent.substring(0, decryptedContent.length - keyHash.length);
        return {
          decryptedNote,
        };
      }
    } catch (err) {
      return {
        decryptedNote: null,
      };
    }
    return {
      decryptedNote: null,
    };
  }

  public static hash(payload: string): string {
    const hash = CryptoJS.SHA512(payload).toString();
    return hash;
  }

  public static hashContent(note: string, secretKey: string, dbVersion = 2) {
    return CryptoJS.SHA512(note + CryptoJS.SHA512(secretKey).toString()).toString() + dbVersion;
  }
}
