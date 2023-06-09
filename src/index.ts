import express, { Application } from 'express';
import cors from 'cors';
import logger from './logger';
import { config } from './config';
import { errorHandler } from './middleware/errorHandler.middleware';
import { BadRequestError } from './error/BadRequestError';
import { messages } from './constant/errors';

const childLogger = logger.child({ filename: __filename });
const SERVER_PORT = process.env.PORT || 3001;
export class ProtectedTextServer {
  private app: Application;

  constructor() {
    this.app = express();
    this.setupMiddlewares();
  }

  private setupMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(cors({ origin: ['http://localhost:3001'], credentials: true }));

    this.app.get('/', (_req, _res, _next) => {
      throw new BadRequestError(messages.BAD_REQUEST);
    });
    // error handling middleware
    this.app.use(errorHandler);
  }

  public start(): void {
    try {
      this.app.listen(SERVER_PORT, () => {
        childLogger.info(`Server running on port http://localhost:${SERVER_PORT}`);
        childLogger.info(config.nodeEnv);
      });
    } catch (error) {
      // logging out error
      process.exit(0);
    }
  }
}
