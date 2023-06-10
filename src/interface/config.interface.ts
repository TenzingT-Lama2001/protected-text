export interface IDbConfig {
  databaseUrl: string;
}

export interface ILoggerConfig {
  level: string;
  filename: string;
  transports: 'FILE' | 'CONSOLE' | ['FILE' | 'CONSOLE'];
  prettyPrint: boolean;
}

export interface IAppConfig {
  port: number;
}
