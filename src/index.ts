/* eslint-disable class-methods-use-this */

import express, { Application } from 'express';
import morgan from 'morgan';
import http from 'http';
import logger from './utils/logger';
import applicationRoutes from './routes';

const SERVER_PORT = 3000;
export class ProtectedTextServer {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public start(): void {
    this.standardMiddleware(this.app);
    this.routesMiddleware(this.app);
    this.startServer(this.app);
  }

  private standardMiddleware(app: Application): void {
    app.use(express.json());
    app.use(morgan('tiny'));
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
    });
  }

  private routesMiddleware(app: Application): void {
    applicationRoutes(app);
  }
}
