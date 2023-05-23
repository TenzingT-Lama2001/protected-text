import dotenv from 'dotenv';
import bunyan from 'bunyan';

dotenv.config({});

class Config {
  public DATABASE_URL: string | undefined;

  public GOOGLE_CLIENT_ID: string | undefined;

  public GOOGLE_CLIENT_SECRET: string | undefined;

  public GITHUB_CLIENT_ID: string | undefined;

  public GITHUB_CLIENT_SECRET: string | undefined;

  constructor() {
    this.DATABASE_URL = process.env.DATABASE_URL;
    this.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    this.GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
    this.GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
    this.GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
  }

  public createLogger(name: string): bunyan {
    return bunyan.createLogger({ name, level: 'debug' });
  }

  public validateConfig(): void {
    Object.entries(this).forEach(([key, value]) => {
      if (value === undefined) {
        throw new Error(`Configuration ${key} is undefined`);
      }
    });
  }
}
export const config: Config = new Config();
