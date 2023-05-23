import { AuthController } from '@controllers/auth/auth.controller';
import { HomeController } from '@controllers/home/home.controller';
import express, { Router } from 'express';
import passport from 'passport';
import { isLoggedIn } from 'src/middleware/isLoggedIn';

export class AuthRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/register', AuthController.prototype.register);
    this.router.post('/login', passport.authenticate('local'), AuthController.prototype.login);
    this.router.post('/test', passport.authenticate('local'), AuthController.prototype.test);
    this.router.get('/logout', AuthController.prototype.logout);
    this.router.get('/protected', isLoggedIn, HomeController.prototype.getHome);
    return this.router;
  }
}
