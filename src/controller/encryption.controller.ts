import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { EncryptionService } from 'src/service/encryption.service';

export class EncryptionController {
  public static async encrypt(req: Request, res: Response) {
    const { note, secretKey, key } = req.body;
    const keyHash = EncryptionService.hash(key);
    const encryptedNote = EncryptionService.encrypt(note, secretKey, keyHash);
    const hash = EncryptionService.hashContent(note, secretKey);
    res.status(HTTP_STATUS.CREATED).json({
      note: encryptedNote,
      hash,
    });
  }

  public static async decrypt(req: Request, res: Response) {
    const { note, secretKey, key } = req.body;
    const keyHash = EncryptionService.hash(key);
    const { success, decryptedNote } = EncryptionService.decrypt(note, secretKey, keyHash);
    if (!success) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        message: 'Not Authorized',
      });
    } else {
      res.status(HTTP_STATUS.OK).json({
        note: decryptedNote,
      });
    }
  }
}
