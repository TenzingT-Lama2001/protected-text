/* eslint-disable class-methods-use-this */
import { homeService } from '@services/home/home.service';
import { Request, Response } from 'express';

export class HomeController {
  public async getHome(_req: Request, res: Response): Promise<void> {
    const data = await homeService.getHome();
    res.status(200).send(data);
  }
}
