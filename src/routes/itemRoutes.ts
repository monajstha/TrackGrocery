import upload from '../middlewares/upload';
import { Router } from 'express';
import {
  itemListGet,
  newItemFormGet,
  newItemPost,
} from '../controllers/itemController';

const router: Router = Router();

router.get('/', itemListGet);
router.get('/item/new', newItemFormGet);
router.post('/item/new', upload.single('item_image'), newItemPost);

export default router;
