import mongoose, { Model, Schema } from 'mongoose';
import { IWebsiteDocument } from 'src/interfaces/website/website.interface';

const WebsiteSchema = new Schema<IWebsiteDocument>({
  name: {
    type: String,
    required: true,
  },
});

type WebsiteModel = Model<IWebsiteDocument>;
const Website = mongoose.model<WebsiteModel>('Website', WebsiteSchema);

export default Website;
