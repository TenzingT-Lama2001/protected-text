import { EncryptionController } from '@controller/encryption.controller';
import validateSchema from '@middleware/validation.middleware';
import express, { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { encryptionDecryptionSchema } from '@schema/encryption.schema';

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
