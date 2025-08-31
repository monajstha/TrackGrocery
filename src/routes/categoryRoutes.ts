import { Router } from 'express';
import {
  newCategoryFormGet,
  newCategoryPost,
} from '../controllers/categoryController';

const categoryRouter: Router = Router();

categoryRouter.get('/new', newCategoryFormGet);
categoryRouter.post('/new', newCategoryPost);

export default categoryRouter;
