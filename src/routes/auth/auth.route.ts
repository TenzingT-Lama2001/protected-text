import { AuthController } from '@controllers/auth/auth.controller';
import { HomeController } from '@controllers/home/home.controller';
import express, { Response, Router, Request } from 'express';
import passport from 'passport';
import { isLoggedIn } from 'src/middleware/isLoggedIn';

export class AuthRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/auth/register', AuthController.prototype.register);
    this.router.post('/auth/login', passport.authenticate('local'), AuthController.prototype.login);
    this.router.post('/test', passport.authenticate('local'), AuthController.prototype.test);
    this.router.get('/auth/logout', AuthController.prototype.logout);
    this.router.get('/auth/protected', isLoggedIn, HomeController.prototype.getHome);
    this.router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
    this.router.get('/auth/failed', (req: Request, res: Response) => res.json({ message: 'Auth failed' }));
    this.router.get(
      '/auth/google/callback',
      passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/auth/failed',
      }),
    );
    this.router.get('/auth/github', passport.authenticate('github'));
    this.router.get(
      '/auth/github/callback',
      passport.authenticate('github', {
        successRedirect: '/',
        failureRedirect: '/auth/failed',
      }),
    );

    return this.router;
  }
}
