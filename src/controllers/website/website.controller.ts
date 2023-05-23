import { IWebsiteController } from '@interfaces/website/website.interface';
import { WebsiteService } from '@services/website/website.service';
import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { CREATED_WEBSITE, FETCHED_WEBSITES } from 'src/constants/messages';

const websiteService: WebsiteService = new WebsiteService();
export class WebsiteController implements IWebsiteController {
  public async createWebsite(req: Request, res: Response): Promise<void> {
    const { name } = req.body;
    const data = await websiteService.createWebsite(name);
    res.status(HTTP_STATUS.CREATED).json({ message: CREATED_WEBSITE, data });
  }

  public async getWebsites(_req: Request, res: Response) {
    const data = await websiteService.getWebsites();
    res.status(HTTP_STATUS.OK).json({
      message: FETCHED_WEBSITES,
      data,
    });
  }
}