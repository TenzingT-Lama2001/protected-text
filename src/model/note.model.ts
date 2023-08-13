import mongoose, { Model, Schema } from 'mongoose';
import { INoteDocument } from '@interface/note/note.interface';

const NoteSchema = new Schema<INoteDocument>({
  _id: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
});

type NoteModel = Model<INoteDocument>;
const Note = mongoose.model<NoteModel>('Note', NoteSchema);
export default Note;

// take site from body and make the site the _id
