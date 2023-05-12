import express, { Router } from 'express';
import { TextController } from 'src/controllers/text/text.controller';

class TextRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/text', TextController.prototype.createText);
    this.router.get('/text', TextController.prototype.getTexts);
    this.router.delete('/text', TextController.prototype.deleteTexts);
    return this.router;
  }
}

export const textRoutes: TextRoutes = new TextRoutes();
