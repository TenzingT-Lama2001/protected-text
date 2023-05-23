import mongoose, { Model, Schema } from 'mongoose';
import validator from 'validator';
import { IUserDocument } from 'src/interfaces/user/user.interface';
import bcrypt from 'bcrypt';

const UserSchema = new Schema<IUserDocument>({
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    validate: [validator.isEmail, 'Please enter email in correct format'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a Password'],
    minlength: [6, 'Password must be atleast 6 characters'],
    select: false,
  },
});
UserSchema.pre<IUserDocument>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  return next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const user = this as IUserDocument;
  const isPasswordCorrect = await bcrypt.compare(candidatePassword, user.password);
  return isPasswordCorrect;
};
export type UserModel = Model<IUserDocument>;
const User = mongoose.model<UserModel>('User', UserSchema);

export default User;
