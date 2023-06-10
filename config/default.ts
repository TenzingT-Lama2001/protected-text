import path from 'path';

export const basePath = path.join(__dirname, '..');
export default {
  basePath,
  db: {
    databaseUrl: 'mongodb://localhost:27017/protected-text',
  },
  logger: {
    level: process.env.LOG_LEVEL || 'info',
    filename: process.env.LOG_FILE_NAME || path.join(basePath, 'logs', 'default.log'),
    transports: process.env.LOG_TRANSPORT || 'CONSOLE',
    prettyPrint: process.env.LOG_PRETTY_PRINT === 'true',
  },
  app: {
    port: 3001,
  },
};
