import { Document } from 'mongoose';
import { Request, Response } from 'express';
import { IWebsiteDocument } from '../website/website.interface';

export interface ITextDocument extends Document {
  text: string;
  website: IWebsiteDocument['_id'];
}
export interface IText {
  text: string;
}
export interface ITextController {
  createText(req: Request, res: Response): Promise<void>;
  getTexts(req: Request, res: Response): Promise<void>;
  deleteTexts(req: Request, res: Response): Promise<void>;
}
export interface ITextService {
  createText(text: string, websiteName: string): Promise<ITextDocument>;
  getTexts(websiteName: string): Promise<ITextDocument[]>;
  deleteTexts(websiteName: string): Promise<void>;
}
