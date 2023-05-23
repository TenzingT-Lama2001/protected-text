import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GitHubStrategy, Profile as GitHubProfile } from 'passport-github2';
import { Strategy as GoogleStrategy, Profile as GoogleProfile, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'src/config';
import { IUserDocument } from 'src/interfaces/user/user.interface';
import User from 'src/models/user/user.model';

export default class PassportStrategies {
  public static initialize(): void {
    this.configureLocalStrategy();
    this.configureSerialization();
    this.configureSocialMediaStrategy();
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

  private static configureSocialMediaStrategy(): void {
    const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = config;

    passport.use(
      new GoogleStrategy(
        {
          clientID: GOOGLE_CLIENT_ID as string,
          clientSecret: GOOGLE_CLIENT_SECRET as string,
          callbackURL: 'http://localhost:3000/api/v1/auth/google/callback',
        },
        async (accessToken, refreshToken, profile: GoogleProfile, done: VerifyCallback) => {
          try {
            const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
            if (!email) {
              done(new Error('Failed to retrieve user email') as Error | null);
            } else {
              const user = await User.findOne({ email });
              if (user) {
                done(null, user);
              } else {
                const newUser = new User({
                  email,
                  password: profile.id,
                });
                await newUser.save();
                done(null, newUser);
              }
            }
          } catch (error: unknown) {
            done(error as Error);
          }
        },
      ),
    );

    passport.use(
      new GitHubStrategy(
        {
          clientID: GITHUB_CLIENT_ID as string,
          clientSecret: GITHUB_CLIENT_SECRET as string,
          callbackURL: 'http://localhost:3000/api/v1/auth/github/callback',
          scope: ['user:email'],
        },
        async (accessToken: string, refreshToken: string, profile: GitHubProfile, done: VerifyCallback) => {
          try {
            const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
            if (!email) {
              done(new Error('Failed to retrieve user email') as Error | null);
            } else {
              const user = await User.findOne({ email });
              if (user) {
                done(null, user);
              } else {
                const newUser = new User({
                  email,
                  password: profile.id,
                });
                await newUser.save();
                done(null, newUser);
              }
            }
          } catch (error: unknown) {
            done(error as Error);
          }
        },
      ),
    );
  }
}
