import { IAuthController } from '@interfaces/auth/auth.interface';
import { AuthService } from '@services/auth/auth.service';
import { NextFunction, Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

const authService: AuthService = new AuthService();
export class AuthController implements IAuthController {
  public async register(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const user = await authService.register(email, password);
    res.status(HTTP_STATUS.CREATED).json({
      user,
      message: 'USER REGISTERED!',
    });
  }

  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const user = await authService.login(email, password);
    res.status(HTTP_STATUS.OK).json({
      user,
      message: 'LOGGED_IN',
    });
  }

  public async test(req: Request, res: Response): Promise<void> {
    res.status(HTTP_STATUS.OK).json({
      message: 'LOGGED_IN',
    });
  }

  public async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.status(HTTP_STATUS.OK).json({
        message: 'LOGGED_OUT',
      });
    });
  }

  //   public async logout(req: Request, res: Response): Promise<void> {}
}
