import mongoose, { Model, Schema } from 'mongoose';
import { ITextDocument } from 'src/interfaces/text/text.interface';

const TextSchema = new Schema<ITextDocument>({
  text: {
    type: String,
    required: true,
  },
  website: {
    type: Schema.Types.ObjectId,
    ref: 'Website',
    required: true,
  },
});

type TextModel = Model<ITextDocument>;
const Text = mongoose.model<TextModel>('Text', TextSchema);

export default Text;
