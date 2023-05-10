import express, { Router } from 'express';
import { AboutController } from 'src/controllers/about/about.controller';

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
