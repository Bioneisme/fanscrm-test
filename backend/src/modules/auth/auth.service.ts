import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { UserPayload } from '../users/types/user-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  public async login(dto: AuthLoginDto) {
    const loggedUser = await this.userService.findOneByEmail(dto.email);
    if (!loggedUser) {
      throw new ForbiddenException('User not found');
    }

    const isPasswordValid = await this.comparePassword(
      dto.password,
      loggedUser.password,
    );

    if (!isPasswordValid) {
      throw new ForbiddenException('Invalid credentials');
    }

    const token = await this.generateToken(loggedUser);
    return { token };
  }

  public async create(dto: CreateUserDto) {
    const user = await this.userService.findOneByEmail(dto.email);
    if (user) {
      throw new ForbiddenException('User already exists');
    }

    const hashedPassword = await this.hashPassword(dto.password);
    const newUser = await this.userService.create({
      ...dto,
      password: hashedPassword,
    });

    const token = await this.generateToken(newUser);
    return { token };
  }

  public async getMe(userPayload: UserPayload) {
    const user = await this.userService.findOneByIdWithoutPassword(
      userPayload.id,
    );
    if (!user) {
      throw new ForbiddenException('User not found');
    }

    return user;
  }

  private async generateToken(user: User): Promise<string> {
    const payload: UserPayload = { email: user.email, id: user.id };
    const tokenSecret = this.configService.get<string>('JWT_TOKEN_SECRET');
    const tokenExpiresIn = this.configService.get<string>(
      'JWT_TOKEN_EXPIRATION',
    );

    return sign(payload, tokenSecret, { expiresIn: tokenExpiresIn });
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  private async comparePassword(
    enteredPassword: string,
    dbPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(enteredPassword, dbPassword);
  }
}
