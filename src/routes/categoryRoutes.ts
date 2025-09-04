import { Router } from 'express';
import {
  categoryDelete,
  categoryListGet,
  categoryUpdateFormGet,
  categoryUpdatePut,
  newCategoryFormGet,
  newCategoryPost,
} from '../controllers/categoryController';

const categoryRouter: Router = Router();

categoryRouter.get('/', categoryListGet);
categoryRouter.get('/new', newCategoryFormGet);
categoryRouter.post('/new', newCategoryPost);
categoryRouter.get('/update/:category_id', categoryUpdateFormGet);
categoryRouter.put('/update/:category_id', categoryUpdatePut);
categoryRouter.delete('/delete/:category_id', categoryDelete);

export default categoryRouter;
