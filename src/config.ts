class Config {
  public DATABASE_URL: string;

  public NODE_ENV: string | undefined;

  public PREETIFY: string | undefined;

  constructor() {
    this.DATABASE_URL = process.env.DATABASE_URL || '';
    this.NODE_ENV = process.env.NODE_ENV;
    this.PREETIFY = process.env.PREETIFY || 'false';
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
