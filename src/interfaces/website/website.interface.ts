import { Document } from 'mongoose';

export interface IWebsiteDocument extends Document {
  name: string;
}
export interface IWebsite {
  name: string;
}
// export type IWebsite = Pick<IWebsiteDocument, 'name'>;
