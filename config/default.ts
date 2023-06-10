export default {
  db: {
    databaseUrl: 'mongodb://localhost:27017/protected-text',
  },
  logger: {
    prettify: true,
    level: 'debug',
    filename: 'dev.log',
  },
  app: {
    port: 3001,
  },
};
