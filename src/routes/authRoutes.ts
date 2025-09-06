import { checkCredentials } from '@controllers/authController';
import { Router } from 'express';

const authRouter: Router = Router();

authRouter.post('/', checkCredentials);

export default authRouter;
