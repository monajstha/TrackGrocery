import { Router } from 'express';
import { createItem } from '../controllers/itemController';

const router: Router = Router();

router.post('/', createItem);

export default router;
