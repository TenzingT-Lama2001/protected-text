import { NextFunction, Request, Response } from 'express';

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.json({ message: 'PLEASE_LOGIN' });
}
