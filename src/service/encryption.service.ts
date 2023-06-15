import CryptoJS from 'crypto-js';

export class EncryptionService {
  public static encrypt(note: string, secretKey: string): string {
    const encryptedNote = CryptoJS.AES.encrypt(note, secretKey).toString();
    return encryptedNote;
  }

  public static decrypt(note: string, secretKey: string): string {
    const decryptedText = CryptoJS.AES.decrypt(note, secretKey).toString(CryptoJS.enc.Utf8);
    return decryptedText;
  }
}
