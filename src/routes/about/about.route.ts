import { Router } from 'express';
import { aboutControllers } from '../../controllers/about';

const router = Router();

router.get('/', aboutControllers.getAbout);

export { router as aboutRoutes };
