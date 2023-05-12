/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { aboutService } from 'src/services/about/about.service';

export class AboutController {
  public async getAbout(_req: Request, res: Response): Promise<void> {
    const data = await aboutService.getAbout();
    res.status(200).send(data);
  }
}
