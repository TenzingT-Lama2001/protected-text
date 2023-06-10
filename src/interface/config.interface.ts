export interface IDbConfig {
  databaseUrl: string;
}

export interface ILoggerConfig {
  prettify: boolean;
  level: string;
  filename: string;
}

export interface IAppConfig {
  port: number;
}
