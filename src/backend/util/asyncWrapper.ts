import { Handler, NextFunction, Request, Response } from 'express';

/**
 * This function wraps a standard Express.js middleware/handler in
 * async form
 **/
export default function (
  callback: (req: Request, res: Response, next: NextFunction) => Promise<void>
): Handler {
  return (req, res, next) => {
    callback(req, res, next).catch(next);
  };
}
