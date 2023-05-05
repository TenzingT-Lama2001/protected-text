import { NextFunction, Request, Response } from 'express';
import { homeServices } from '../../services/home';

export async function getHome(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const data = await homeServices.getHome();

  res.status(200).send(data);
}
