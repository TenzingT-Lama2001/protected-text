/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import {
  CREATED_TEXT,
  DELETED_TEXTS,
  // eslint-disable-next-line prettier/prettier
  FETCHED_TEXTS
} from 'src/constants/messages';
import { ITextController } from 'src/interfaces/text/text.interface';
import { textService } from 'src/services/text/text.service';

export class TextController implements ITextController {
  public async createText(req: Request, res: Response): Promise<void> {
    const { text } = req.body;
    const websiteName = req.query.websiteName as string;
    const data = await textService.createText(text, websiteName);
    res.status(HTTP_STATUS.CREATED).json({ message: CREATED_TEXT, data });
  }

  public async getTexts(req: Request, res: Response) {
    const websiteName = req.query.websiteName as string;
    const data = await textService.getTexts(websiteName);
    res.status(HTTP_STATUS.OK).json({
      message: FETCHED_TEXTS,
      data,
    });
  }

  public async deleteTexts(req: Request, res: Response) {
    const websiteName = req.query.websiteName as string;
    const data = await textService.deleteTexts(websiteName);
    res.status(HTTP_STATUS.OK).json({
      message: DELETED_TEXTS,
      data,
    });
  }
}
