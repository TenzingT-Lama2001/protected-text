import { AboutController } from '@controllers/about/about.controller';
import express, { Router } from 'express';

export class AboutRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/about', AboutController.prototype.getAbout);
    return this.router;
  }
}
