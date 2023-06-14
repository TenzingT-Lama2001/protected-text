import express, { Application } from 'express';
import cors from 'cors';
import ptLogger from '@logger';
import HTTP_STATUS from 'http-status-codes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.middleware';

const logger = ptLogger.child({ file: __filename });
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

    this.app.get('/', (_req, res, _next) => {
      res.status(HTTP_STATUS.BAD_REQUEST);
      throw new Error('Bad req');
    });
    // error handling middleware
    this.app.use(notFoundHandler);
    this.app.use(errorHandler);
  }

  public start(): void {
    try {
      this.app.listen(SERVER_PORT, () => {
        logger.info(`Server running on port http://localhost:${SERVER_PORT}`);
      });
    } catch (error) {
      // logging out error
      process.exit(0);
    }
  }
}
