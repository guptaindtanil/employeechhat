import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { controller } from '@config/controller/controller';
import { StatusError } from '@config/statusError/statusError';
import { IUserId } from '@modules/users/model';
import { userService } from '@services/index';

export const getAllUserData = controller(async (req: Request, res: Response): Promise<void> => {
  const reqBody: IUserId = req.body;
  // get user details for all users
  const userDetails = await userService.getUserDetailsById(reqBody.id);
  if (!userDetails) {
    throw StatusError.badRequest('notFound');
  }
  const getthealldata = await userService.getAllUserDetails(reqBody.id)
  res.send(getthealldata);
});
