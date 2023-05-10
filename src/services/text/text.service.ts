/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
import { ITextDocument } from 'src/interfaces/text/text.interface';
import Text from 'src/models/text/text.model';
import Website from 'src/models/website/website.model';
import logger from 'src/utils/logger';

interface ITextService {
  createText(text: string, websiteName: string): Promise<ITextDocument>;
  getTexts(websiteName: string): Promise<ITextDocument[]>;
}

export class TextService implements ITextService {
  public async createText(
    text: string,
    websiteName: string,
  ): Promise<ITextDocument> {
    const website = await Website.findOne({ name: websiteName });

    if (!website) {
      throw new Error('No website');
    }

    const newText = await Text.create({ text, website: website._id });
    return newText.toObject() as ITextDocument;
  }

  public async getTexts(websiteName: string): Promise<ITextDocument[]> {
    const website = await Website.findOne({ name: websiteName });
    if (!website) {
      throw new Error('No website');
    }
    const texts = await Text.find({ website: website._id }).populate('website');
    return texts.map((text) => text.toObject() as ITextDocument);
  }
}

export const textService: TextService = new TextService();
