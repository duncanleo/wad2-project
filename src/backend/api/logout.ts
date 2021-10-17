import { Request, Response } from 'express';

export async function logout(req: Request, res: Response) {
  req.session = null;

  res.redirect('/');
}
