import app from './app';
import logger from './utils/logger';

const PORT = 4242;

app.listen(PORT, () => {
  logger.info(`Server listening on port  ${PORT}.`);
});
