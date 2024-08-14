import {
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard {
  constructor(private configService: ConfigService) {}

  public async canActivate(
    context: ExecutionContext,
  ): Promise<boolean | UnauthorizedException> {
    const req = context.switchToHttp().getRequest();
    const authHeader = String(req.headers['authorization'] || '');

    if (authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];

      try {
        const secret = this.configService.get('JWT_TOKEN_SECRET');
        verify(token, secret);

        return true;
      } catch (err) {
        throw new UnauthorizedException({
          status: HttpStatus.UNAUTHORIZED,
          message: 'Invalid token',
        });
      }
    }

    throw new UnauthorizedException({
      status: HttpStatus.UNAUTHORIZED,
      message: 'Unauthorized',
    });
  }
}
