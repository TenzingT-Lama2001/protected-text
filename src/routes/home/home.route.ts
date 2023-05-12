import { HomeController } from '@controllers/home/home.controller';
import express, { Router } from 'express';

class HomeRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/home', HomeController.prototype.getHome);
    return this.router;
  }
}

export const homeRoutes: HomeRoutes = new HomeRoutes();
