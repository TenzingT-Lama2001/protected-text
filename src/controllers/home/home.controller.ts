import { HomeService } from '@services/home/home.service';
import { Request, Response } from 'express';

export const homeService: HomeService = new HomeService();
export class HomeController {
  public async getHome(_req: Request, res: Response): Promise<void> {
    const data = await homeService.getHome();
    res.status(200).send(data);
  }
}
