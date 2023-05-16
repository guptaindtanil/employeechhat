import { Request, Response } from 'express';
import { controller } from '@config/controller/controller';
import { StatusError } from '@config/statusError/statusError';
import { userService } from '@services/index';

/**
 * This function is used for genrating new refresh token
 * @param req
 * @param res
 */
export const genrateNewToken = controller(async (req: Request, res: Response): Promise<void> => {
  if (!req.userDetails) {
    throw StatusError.unauthorized('');
  }
  res.send(userService.genrateUserTokens(req.userDetails));
});
