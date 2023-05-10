import { Document } from 'mongoose';
import { IWebsiteDocument } from '../website/website.interface';

export interface ITextDocument extends Document {
  text: string;
  website: IWebsiteDocument['_id'];
}
export interface IText {
  text: string;
}
// export type IWebsite = Pick<IWebsiteDocument, 'name'>;
