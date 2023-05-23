import { Document, Types } from 'mongoose';

export interface IUserDocument extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
export interface IUser {
  email: string;
  password: string;
}
