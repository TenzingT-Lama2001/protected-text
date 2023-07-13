import CryptoJS from 'crypto-js';

export class EncryptionService {
  public static encrypt(note: string, secretKey: string, siteHash: string): string {
    const contentAndSiteHash = String(note + siteHash);
    const encryptedNote = CryptoJS.AES.encrypt(contentAndSiteHash, secretKey).toString();
    return encryptedNote;
  }

  public static decrypt(note: string, secretKey: string, siteHash: string): string {
    const contentAndSiteHash = String(note + siteHash);
    const decryptedText = CryptoJS.AES.decrypt(contentAndSiteHash, secretKey).toString(CryptoJS.enc.Utf8);
    return decryptedText;
  }

  public static hash(note: string): string {
    const hash = CryptoJS.SHA512(note).toString();
    return hash;
  }
}
