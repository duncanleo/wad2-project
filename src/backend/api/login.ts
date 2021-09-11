import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import Joi from 'joi';

import { ErrorUnauthorized } from '../errors';
import { User } from '../model';

interface LoginPayload {
  email: string;
  password: string;
}

const LoginPayloadSchema = Joi.object<LoginPayload>({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export async function login(req: Request, res: Response) {
  const validationResult = LoginPayloadSchema.validate(req.body);

  if (validationResult.error) {
    throw validationResult.error;
  }

  const { email, password } = validationResult.value as LoginPayload;

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (user == null) {
    throw new ErrorUnauthorized();
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new ErrorUnauthorized();
  }

  if (req.session != null) {
    req.session.userId = user.id;
  }

  res
    .status(200)
    .json({
      status: true,
    })
    .end();
}
