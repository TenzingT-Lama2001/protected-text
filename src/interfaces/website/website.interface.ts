import { Document } from 'mongoose';
import { Request, Response } from 'express';

export interface IWebsiteDocument extends Document {
  name: string;
}
export interface IWebsite {
  name: string;
}
export interface IWebsiteController {
  createWebsite(req: Request, res: Response): Promise<void>;
  getWebsites(req: Request, res: Response): Promise<void>;
}
