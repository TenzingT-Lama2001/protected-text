import express, { Application, Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import HTTP_STATUS from 'http-status-codes';
import logger from './logger';
import { config } from './config';
import { loggerMiddleware } from './middleware/logger.middleware';
import applicationRoutes from './routes';
// import morgan from 'morgan';

const SERVER_PORT = 3001;
export class ProtectedTextServer {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public start(): void {
    this.standardMiddleware(this.app);
    this.routesMiddleware(this.app);
    this.globalErrorHandler(this.app);
    this.startServer(this.app);
  }

  private standardMiddleware(app: Application): void {
    app.use(express.json());
    app.use(loggerMiddleware);
    // app.use(morgan('tiny'));
    app.use(cors({ origin: ['http://localhost:3001'], credentials: true }));
  }

  private async startServer(app: Application): Promise<void> {
    try {
      const httpServer: http.Server = new http.Server(app);
      this.startHttpServer(httpServer);
    } catch (error) {
      logger.error(error);
    }
  }

  private startHttpServer(httpServer: http.Server): void {
    httpServer.listen(SERVER_PORT, () => {
      logger.info(`Server running on port http://localhost:${SERVER_PORT}`);
      logger.info(config.NODE_ENV);
    });
  }

  private routesMiddleware(app: Application): void {
    applicationRoutes(app);
  }

  private globalErrorHandler(app: Application): void {
    // 404 handler
    app.all('*', (req: Request, res: Response) => {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: `${req.originalUrl} not found` });
    });
    app.use((req: Request, res: Response) => {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    });
  }
}
