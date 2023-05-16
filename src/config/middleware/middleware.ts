import { Request, Response, NextFunction } from "express";

export const middleware = (handler: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res);
      next();
    } catch(err) {
      next(err);
    }
  }
}