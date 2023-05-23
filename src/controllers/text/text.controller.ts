import { ITextController } from '@interfaces/text/text.interface';
import { TextService } from '@services/text/text.service';
import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { CREATED_TEXT, DELETED_TEXTS, FETCHED_TEXTS } from 'src/constants/messages';

export const textService: TextService = new TextService();
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
