import express, { Application } from 'express';
import http from 'http';
import cors from 'cors';

const SERVER_PORT = 3001;
export class ProtectedTextServer {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public start(): void {
    this.standardMiddleware();
    this.startServer();
  }

  private standardMiddleware(): void {
    this.app.use(express.json());
    this.app.use(cors({ origin: ['http://localhost:3001'], credentials: true }));
  }

  private async startServer(): Promise<void> {
    try {
      const httpServer: http.Server = new http.Server(this.app);
      ProtectedTextServer.startHttpServer(httpServer);
    } catch (error) {
      // logging out error
    }
  }

  private static startHttpServer(httpServer: http.Server): void {
    httpServer.listen(SERVER_PORT, () => {
      // Logging out info or performing other operations
    });
  }
}
