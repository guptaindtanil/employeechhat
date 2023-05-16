import { Request, Response } from 'express';
import { controller } from '@config/controller/controller';
/**
 * This function is used for fetching current user details
 * @param req
 * @param res
 */
export const getCurrentUserDetails = controller(
  async (req: Request, res: Response): Promise<void> => {
    res.send(req.userDetails);
  },
);
