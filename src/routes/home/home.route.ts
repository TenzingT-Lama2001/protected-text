import express, { Router } from 'express';
import { HomeController } from 'src/controllers/home/home.controller';

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
