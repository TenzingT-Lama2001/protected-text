/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { CREATED_TEXT, FETCHED_TEXTS } from 'src/constants/messages';
import { textService } from 'src/services/text/text.service';

interface ITextController {
  createText(req: Request, res: Response): Promise<void>;
  getTexts(req: Request, res: Response): Promise<void>;
}
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
}
