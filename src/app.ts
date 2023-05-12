/* eslint-disable class-methods-use-this */
import express, { Express } from 'express';
import { ProtectedTextServer } from './index';
import databaseConnection from './setupDatabase';

class Application {
  public initialize(): void {
    databaseConnection();
    const app: Express = express();
    const server: ProtectedTextServer = new ProtectedTextServer(app);
    server.start();
  }
}

const application: Application = new Application();
application.initialize();
