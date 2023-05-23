import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { IUserDocument } from 'src/interfaces/user/user.interface';
import User from 'src/models/user/user.model';

export default class PassportStrategies {
  public static initialize(): void {
    this.configureLocalStrategy();
    this.configureSerialization();
  }

  private static configureLocalStrategy(): void {
    passport.use(
      new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
          const user = (await User.findOne({ email }).select('+password')) as IUserDocument | null;
          if (!user) {
            return done(null, false, { message: 'Incorrect email' });
          }
          const isPasswordValid = await user.comparePassword(password);
          if (!isPasswordValid) {
            return done(null, false, { message: 'Incorrect password' });
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }),
    );
  }

  private static configureSerialization(): void {
    passport.serializeUser((user, done) => {
      done(null, user);
    });

    passport.deserializeUser(async (id, done) => {
      try {
        const user = await User.findById(id);
        done(null, user);
      } catch (error) {
        done(error);
      }
    });
  }
}
