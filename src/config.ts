class Config {
  public DATABASE_URL: string;

  public NODE_ENV: string | undefined;

  constructor() {
    this.DATABASE_URL = process.env.DATABASE_URL || '';
    this.NODE_ENV = process.env.NODE_ENV;
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
