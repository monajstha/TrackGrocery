import { Router } from 'express';
import {
  itemListGet,
  newItemFormGet,
  newItemPost,
} from '../controllers/itemController';

const router: Router = Router();

router.get('/', itemListGet);
router.get('/item/new', newItemFormGet);
router.post('/item/new', newItemPost);
// router.post('/', createItem);

export default router;
