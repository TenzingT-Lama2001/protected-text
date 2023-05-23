import { NextFunction, Request, Response } from 'express';
import { IUserDocument } from '../user/user.interface';

export interface IAuthController {
  register(req: Request, res: Response, next: NextFunction): Promise<void>;
  login(req: Request, res: Response, next: NextFunction): Promise<void>;
  // logout(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export interface IAuthService {
  register(email: string, password: string): Promise<IUserDocument>;
  login(email: string, password: string): Promise<IUserDocument>;
}
