import { EncryptionService } from '@service/encryption.service';
import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

export class EncryptionController {
  public static async encrypt(req: Request, res: Response) {
    const { note, secretKey, noteId } = req.body;
    const noteIdHash = EncryptionService.hash(noteId);
    const encryptedNote = EncryptionService.encrypt(note, secretKey, noteIdHash);
    const secretKeyHash = EncryptionService.hash(secretKey);
    const hash = EncryptionService.hash(note + secretKeyHash);
    res.status(HTTP_STATUS.CREATED).json({
      note: encryptedNote,
      hash,
    });
  }

  public static async decrypt(req: Request, res: Response) {
    const { note, secretKey, noteId } = req.body;
    const noteIdHash = EncryptionService.hash(noteId);
    const { message, decryptedNote } = EncryptionService.decrypt(note, secretKey, noteIdHash);
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
