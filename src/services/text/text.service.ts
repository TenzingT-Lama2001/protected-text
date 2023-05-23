import { ITextDocument, ITextService } from 'src/interfaces/text/text.interface';
import { IWebsiteDocument } from 'src/interfaces/website/website.interface';
import Text from 'src/models/text/text.model';
import Website from 'src/models/website/website.model';

export class TextService implements ITextService {
  public async createText(text: string, websiteName: string): Promise<ITextDocument> {
    const website = (await Website.findOne({
      name: websiteName,
    })) as IWebsiteDocument | null;

    if (!website) {
      throw new Error('No website');
    }

    const existingText = (await Text.findOne({
      website: website._id,
    })) as ITextDocument | null;

    if (!existingText) {
      const newText = await Text.create({ text, website: website._id });
      return newText.toObject() as ITextDocument;
    }

    existingText.text = text;
    await existingText.save();
    return existingText.toObject() as ITextDocument;
  }

  public async getTexts(websiteName: string): Promise<ITextDocument[]> {
    const website = (await Website.findOne({
      name: websiteName,
    })) as IWebsiteDocument | null;
    if (!website) {
      throw new Error('No website');
    }
    const texts = await Text.find({ website: website._id }).populate('website');
    return texts.map((text) => text.toObject() as ITextDocument);
  }

  public async deleteTexts(websiteName: string): Promise<void> {
    const website = (await Website.findOne({
      name: websiteName,
    })) as IWebsiteDocument | null;
    if (!website) {
      throw new Error('No website');
    }
    await Text.findOneAndDelete({ website: website._id });
  }
}
