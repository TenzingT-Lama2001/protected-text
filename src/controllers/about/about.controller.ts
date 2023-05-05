import { NextFunction, Request, Response } from 'express';
import { aboutServices } from '../../services/about';

export async function getAbout(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const data = await aboutServices.getAbout();

  res.status(200).send(data);
}
