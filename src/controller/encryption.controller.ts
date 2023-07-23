import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { EncryptionService } from 'src/service/encryption.service';

export class EncryptionController {
  public static async encrypt(req: Request, res: Response) {
    const { note, secretKey } = req.body;
    const encryptedNote = EncryptionService.encrypt(note, secretKey);
    const hash = EncryptionService.hash(note);
    res.status(HTTP_STATUS.CREATED).json({
      note: encryptedNote,
      hash,
    });
  }

  public static async decrypt(req: Request, res: Response) {
    const { note, secretKey } = req.body;
    const decryptedNote = EncryptionService.decrypt(note, secretKey);
    res.status(HTTP_STATUS.CREATED).json({
      note: decryptedNote,
    });
  }
}
