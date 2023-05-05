import logger from 'src/utils/logger';

export async function getHome() {
  logger.info('home page');
  return 'This is the home';
}
