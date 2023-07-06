import express, { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { EncryptionController } from 'src/controller/encryption.controller';

export class EncryptionRoutes {
  public router: Router = express.Router();

  constructor() {
    this.router.post('/encrypt', asyncHandler(EncryptionController.encrypt));
    this.router.post('/decrypt', asyncHandler(EncryptionController.decrypt));
  }
}
