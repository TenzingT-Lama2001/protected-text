import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { EncryptionService } from 'src/service/encryption.service';

export class EncryptionController {
  public static async encrypt(req: Request, res: Response) {
    const { encryptNote, secretKey } = req.body;
    const note = await EncryptionService.encrypt(encryptNote, secretKey);
    res.status(HTTP_STATUS.CREATED).json({
      note,
    });
  }

  public static async decrypt(req: Request, res: Response) {
    const { decryptNote, secretKey } = req.body;
    const note = await EncryptionService.decrypt(decryptNote, secretKey);
    res.status(HTTP_STATUS.CREATED).json({
      note,
    });
  }
}
