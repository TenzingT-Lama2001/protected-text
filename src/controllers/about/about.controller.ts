/* eslint-disable class-methods-use-this */
import { aboutService } from '@services/about/about.service';
import { Request, Response } from 'express';

export class AboutController {
  public async getAbout(_req: Request, res: Response): Promise<void> {
    const data = await aboutService.getAbout();
    res.status(200).send(data);
  }
}
