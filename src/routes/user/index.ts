import { Router } from 'express';
import { userController } from '@controllers/index';
import { validateApiKey, validateUserRefreshToken } from '@middleware/index';

import { userLogin, userSignup } from '@validations/user';

const userRouter = Router();

userRouter.use(validateApiKey);

userRouter.post('/login', userLogin, userController.useLogin);

userRouter.get('/token', validateUserRefreshToken, userController.genrateNewToken);

userRouter.post('/signup', userSignup, userController.createUser);

userRouter.post('/getalluser', userController.getAllUserData);

export { userRouter };
