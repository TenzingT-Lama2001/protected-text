import './dotEnvInit';
import { ProtectedTextServer } from './index';
import databaseConnection from './setupDatabase';
import { config } from './config';

class Application {
  public static async initialize(): Promise<void> {
    Application.loadConfig();
    await databaseConnection();
    const server = new ProtectedTextServer();
    server.start();
  }

  private static loadConfig(): void {
    config.validateConfig();
  }
}

Application.initialize();
