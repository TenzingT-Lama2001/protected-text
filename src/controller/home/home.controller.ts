import { Request, Response } from 'express';
import { HomeService } from 'src/service/home/home.service';

export const homeService: HomeService = new HomeService();
export class HomeController {
  public async getHome(req: Request, res: Response): Promise<void> {
    const data = await homeService.getHome();
    res.status(200).send(data);
  }
}
