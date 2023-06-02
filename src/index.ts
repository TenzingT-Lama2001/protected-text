import express, { Application } from 'express';
import cors from 'cors';

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
        // Logging out info or performing other operations
      });
    } catch (error) {
      // logging out error
      process.exit(0);
    }
  }
}
