import { Router } from 'express';
import { homeControllers } from '../../controllers/home';

const router = Router();

router.get('/', homeControllers.getHome);

export { router as homeRoutes };
