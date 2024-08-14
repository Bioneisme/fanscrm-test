import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { decode } from 'jsonwebtoken';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { User } from '../../modules/users/user.entity';
import { UserPayload } from '../../modules/users/types/user-payload.type';

export const UserDecorator = createParamDecorator<User>(
  (_data: unknown, ctx: ExecutionContext) => {
    return userDecode(ctx.switchToHttp());
  },
);

export const userDecode = (http: HttpArgumentsHost) => {
  const req = http.getRequest();

  const authHeader = String(req.headers['authorization'] || '');
  if (authHeader.startsWith('Bearer ')) {
    try {
      const token = authHeader.split(' ')[1];

      return decode(token) as UserPayload;
    } catch (err) {
      return null;
    }
  }
  return null;
};
