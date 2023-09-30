import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { decrypt, encrypt, hash } from 'encryption-handler';

export class EncryptionController {
  public static encrypt(req: Request, res: Response) {
    const { note, secretKey, noteId } = req.body;
    const noteIdHash = hash(noteId);
    const encryptedNote = encrypt(note, secretKey, noteIdHash);
    const secretKeyHash = hash(secretKey);
    const hashed = hash(note + secretKeyHash);
    res.status(HTTP_STATUS.CREATED).json({
      note: encryptedNote,
      hash: hashed,
    });
  }

  public static decrypt(req: Request, res: Response) {
    const { note, secretKey, noteId } = req.body;
    const noteIdHash = hash(noteId);
    const { message, decryptedNote } = decrypt(note, secretKey, noteIdHash);
    if (!decryptedNote) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        message,
      });
    } else {
      res.status(HTTP_STATUS.OK).json({
        note: decryptedNote,
      });
    }
  }
}
