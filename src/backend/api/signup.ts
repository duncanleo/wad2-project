import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import Joi from 'joi';
import passwordComplexity from 'joi-password-complexity';

import { ErrorBadRequest } from '../errors';
import { User } from '../model';

interface SignupPayload {
  display_name: string;
  email: string;
  password: string;
}

const SignupPayloadSchema = Joi.object<SignupPayload>({
  display_name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: passwordComplexity(),
});

export async function signup(req: Request, res: Response) {
  const validationResult = SignupPayloadSchema.validate(req.body);

  if (validationResult.error) {
    throw validationResult.error;
  }

  const { email, password, display_name } =
    validationResult.value as SignupPayload;

  let user = await User.findOne({
    where: {
      email,
    },
  });

  if (user != null) {
    throw new ErrorBadRequest('email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    display_name,
    email,
    password: hashedPassword,
  });

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
