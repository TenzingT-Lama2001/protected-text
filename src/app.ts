import express, { Express } from 'express';
import { ProtectedTextServer } from './index';
import databaseConnection from './setupDatabase';
import { config } from './config';

class Application {
  public static initialize(): void {
    Application.loadConfig();
    databaseConnection();
    const app: Express = express();
    const server: ProtectedTextServer = new ProtectedTextServer(app);
    server.start();
  }

  private static loadConfig(): void {
    config.validateConfig();
  }
}

Application.initialize();
