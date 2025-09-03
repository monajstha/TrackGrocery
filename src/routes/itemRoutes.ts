import upload from '../middlewares/upload';
import { Router } from 'express';
import {
  itemDelete,
  itemListGet,
  itemUpdateFormGet,
  itemUpdatePut,
  newItemFormGet,
  newItemPost,
} from '../controllers/itemController';

const router: Router = Router();

router.get('/', itemListGet);
router.get('/item/new', newItemFormGet);
router.post('/item/new', upload.single('item_image'), newItemPost);
router.get('/item/update/:item_id', itemUpdateFormGet);
router.put('/item/update/:item_id', upload.single('item_image'), itemUpdatePut);
router.delete('/item/delete/:item_id', itemDelete);

export default router;
