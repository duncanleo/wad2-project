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
  type: 'gamer' | 'organiser';
}

const SignupPayloadSchema = Joi.object<SignupPayload>({
  display_name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: passwordComplexity(),
  type: Joi.string().valid('gamer', 'organiser').required(),
});

export async function signup(req: Request, res: Response) {
  const validationResult = SignupPayloadSchema.validate(req.body);

  if (validationResult.error) {
    throw new ErrorBadRequest(validationResult.error.message);
  }

  const { email, password, display_name, type } =
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
    type,
    bio: null,
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
