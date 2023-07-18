import express, { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { EncryptionController } from 'src/controller/encryption.controller';
import validateSchema from 'src/middleware/validation.middleware';
import { encryptionDecryptionSchema } from 'src/schema/encryption.schema';

export class EncryptionRoutes {
  public router: Router = express.Router();

  constructor() {
    this.router.post(
      '/encrypt',
      validateSchema(encryptionDecryptionSchema),
      asyncHandler(EncryptionController.encrypt),
    );
    this.router.post(
      '/decrypt',
      validateSchema(encryptionDecryptionSchema),
      asyncHandler(EncryptionController.decrypt),
    );
  }
}
