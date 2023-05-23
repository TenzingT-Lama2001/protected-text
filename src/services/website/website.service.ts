import { IWebsiteDocument } from 'src/interfaces/website/website.interface';
import Website from 'src/models/website/website.model';

interface IWebsiteService {
  createWebsite(name: string): Promise<IWebsiteDocument>;
  getWebsites(): Promise<IWebsiteDocument[]>;
}

export class WebsiteService implements IWebsiteService {
  public async createWebsite(name: string): Promise<IWebsiteDocument> {
    const existingWebsite = await Website.findOne({ name });

    if (existingWebsite) {
      throw new Error('Website already exists');
    }

    const newWebsite = await Website.create({ name });
    return newWebsite.toObject() as IWebsiteDocument;
  }

  public async getWebsites(): Promise<IWebsiteDocument[]> {
    const websites = await Website.find();
    return websites.map((website) => website.toObject() as IWebsiteDocument);
  }
}
