import { Router } from 'express';
import { userRouter } from './user';

const v1Router = Router();

v1Router.use('/user', userRouter);
// All routes go here

export { v1Router };
