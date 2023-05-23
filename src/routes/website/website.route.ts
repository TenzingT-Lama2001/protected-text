import { WebsiteController } from '@controllers/website/website.controller';
import express, { Router } from 'express';

export class WebsiteRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/website', WebsiteController.prototype.createWebsite);
    this.router.get('/website', WebsiteController.prototype.getWebsites);
    return this.router;
  }
}
