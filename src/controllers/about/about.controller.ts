import { AboutService } from '@services/about/about.service';
import { Request, Response } from 'express';

const aboutService: AboutService = new AboutService();
export class AboutController {
  public async getAbout(_req: Request, res: Response): Promise<void> {
    const data = await aboutService.getAbout();
    res.status(200).send(data);
  }
}
