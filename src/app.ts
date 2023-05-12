/* eslint-disable class-methods-use-this */
import express, { Express } from 'express';
import { ProtectedTextServer } from './index';
import databaseConnection from './setupDatabase';
import { config } from './config';

class Application {
  public initialize(): void {
    this.loadConfig();
    databaseConnection();
    const app: Express = express();
    const server: ProtectedTextServer = new ProtectedTextServer(app);
    server.start();
  }

  private loadConfig(): void {
    config.validateConfig();
  }
}

const application: Application = new Application();
application.initialize();
