import express, { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { EncryptionController } from 'src/controller/encryption.controller';

export class EncryptionRoutes {
  private router: Router = express.Router();

  public routes(): Router {
    this.router.post('/encrypt', asyncHandler(EncryptionController.encrypt));
    this.router.post('/decrypt', asyncHandler(EncryptionController.decrypt));
    return this.router;
  }
}
