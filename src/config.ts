import dotenv from 'dotenv';
import bunyan from 'bunyan';

dotenv.config({});

class Config {
  public DATABASE_URL: string | undefined;

  constructor() {
    this.DATABASE_URL = process.env.DATABASE_URL;
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
