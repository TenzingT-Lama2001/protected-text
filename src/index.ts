import express, { Application } from 'express';
import morgan from 'morgan';
import http from 'http';
import Logger from 'bunyan';
import session from 'express-session';
import passport from 'passport';
import applicationRoutes from './routes';
import { config } from './config';

import PassportStrategies from './utils/PassportStrategies';

const log: Logger = config.createLogger('server');
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
    app.use(
      session({
        secret: 'my-sec-key',
        resave: true,
        saveUninitialized: true,
        cookie: {
          maxAge: 100000,
        },
        proxy: true,
      }),
    );
    app.use(passport.initialize());
    app.use(passport.session());
    PassportStrategies.initialize();
  }

  private async startServer(app: Application): Promise<void> {
    try {
      const httpServer: http.Server = new http.Server(app);
      this.startHttpServer(httpServer);
    } catch (error) {
      log.error(error);
    }
  }

  private startHttpServer(httpServer: http.Server): void {
    httpServer.listen(SERVER_PORT, () => {
      log.info(`Server running on port http://localhost:${SERVER_PORT}`);
    });
  }

  private routesMiddleware(app: Application): void {
    applicationRoutes(app);
  }
}
