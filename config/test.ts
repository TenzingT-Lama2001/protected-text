import path from 'path';

export const basePath = path.join(__dirname, '..');
export const isDevEnv = process.env.NODE_ENV === 'development';
export default {
  basePath,
  db: {
    databaseUrl: 'mongodb://localhost:27017/protected-text-test',
  },
  logger: {
    level: 'info',
    filename: path.join(basePath, 'logs', 'default.log'),
    transports: 'CONSOLE',
    prettyPrint: 'true',
  },
  app: {
    port: 3001,
  },
};
