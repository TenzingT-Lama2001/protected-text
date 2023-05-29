import express, { Router } from 'express';
import { HomeController } from 'src/controller/home/home.controller';

export class HomeRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/home', HomeController.prototype.getHome);
    return this.router;
  }
}
