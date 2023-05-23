import { IAuthService } from 'src/interfaces/auth/auth.interface';
import { IUserDocument } from 'src/interfaces/user/user.interface';
import User from 'src/models/user/user.model';

export class AuthService implements IAuthService {
  public async register(email: string, password: string): Promise<IUserDocument> {
    const user = await User.findOne({ email }).select('+password');
    if (user) {
      throw new Error('USER_ALREADY_EXIST');
    }
    const newUser = await User.create({
      email,
      password,
    });

    return newUser.toObject() as IUserDocument;
  }

  public async login(email: string, password: string): Promise<IUserDocument> {
    const user = (await User.findOne({ email }).select('+password')) as IUserDocument | null;
    if (!user) {
      throw new Error('NO_USER_FOUND');
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new Error('INVALID_CREDENTIALS');
    }
    return user.toObject() as IUserDocument;
  }
}
