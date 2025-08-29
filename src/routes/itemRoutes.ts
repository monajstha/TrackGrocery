import { Router } from 'express';
import { createItem, itemListGet } from '../controllers/itemController';

const router: Router = Router();

router.get('/', itemListGet);
router.post('/', createItem);

export default router;
