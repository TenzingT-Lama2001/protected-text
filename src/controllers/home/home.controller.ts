/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { homeService } from 'src/services/home/home.service';

export class HomeController {
  public async getHome(_req: Request, res: Response): Promise<void> {
    const data = await homeService.getHome();
    res.status(200).send(data);
  }
}
