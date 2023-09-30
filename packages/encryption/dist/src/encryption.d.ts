import { TDecryptNote } from './encryption.interface';
export declare function encrypt(note: string, secretKey: string, noteIdHash: string): string;
export declare function decrypt(encryptedNote: string, secretKey: string, noteIdHash: string): TDecryptNote;
export declare function hash(payload: string): string;
