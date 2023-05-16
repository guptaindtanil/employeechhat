import { Request, Response } from 'express';
import { userService } from '@services/index';
import { ICreateUserRequest } from '@modules/users/model';
import bcrypt from 'bcrypt';
import { controller } from '@config/controller/controller';
import { StatusError } from '@config/statusError/statusError';
import { envs } from '@config/env';
import { Validator } from 'mongoose';

export const createUser = controller(async (req: Request, res: Response): Promise<void> => {
  
  // existing user verification
  const reqBody: ICreateUserRequest = req.body;

  const isEmailUnique = await userService.checkUniqueEmail(reqBody.email);
  if (!isEmailUnique) {
    throw StatusError.badRequest('duplicateEmail');
  }
  reqBody.password = await bcrypt.hash(reqBody.password, envs.passwordSalt);
  await userService.saveUser(reqBody);
  // res.sendStatus(204);
  res.send({responseCode: 200, message : 'Data saved..'});
});
