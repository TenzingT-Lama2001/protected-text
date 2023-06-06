import express, { Application } from 'express';
import cors from 'cors';
import logger from './logger';
import { config } from './config';

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
    // other middlewares
  }

  public start(): void {
    try {
      this.app.listen(SERVER_PORT, () => {
        logger.info(`Server running on port http://localhost:${SERVER_PORT}`);
        logger.info(config.NODE_ENV);
      });
    } catch (error) {
      // logging out error
      process.exit(0);
    }
  }
}
