import './dotEnvInit';
import { ProtectedTextServer } from './index';
import databaseConnection from './setupDatabase';

class Application {
  public static async initialize(): Promise<void> {
    await databaseConnection();
    const server = new ProtectedTextServer();
    server.start();
  }
}

Application.initialize();
