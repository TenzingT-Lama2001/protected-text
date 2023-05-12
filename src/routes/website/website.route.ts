import { WebsiteController } from '@controllers/website/website.controller';
import express, { Router } from 'express';

class WebsiteRoutes {
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

export const websiteRoutes: WebsiteRoutes = new WebsiteRoutes();
