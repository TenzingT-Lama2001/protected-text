import { AboutController } from '@controllers/about/about.controller';
import express, { Router } from 'express';

class AboutRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/about', AboutController.prototype.getAbout);
    return this.router;
  }
}

export const aboutRoutes: AboutRoutes = new AboutRoutes();
