import express, { Router } from 'express';
import { NoteRoutes } from './notes/index';
import { EncryptionRoutes } from './encryption';

export class V1Routes {
  public router: Router = express.Router();

  constructor() {
    this.router.use('/notes', new NoteRoutes().router);
    this.router.use('/', new EncryptionRoutes().router);
  }
}
