import {
  Controller,
  Body,
  Post,
  UseGuards,
  Version,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../core/guards/auth.guard';
import { UserDecorator } from '../../core/decorators/user.decorator';
import { UserPayload } from '../users/types/user-payload.type';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @Version('1')
  async login(@Body() dto: AuthLoginDto) {
    return await this.authService.login(dto);
  }

  @Post('signup')
  @Version('1')
  async signUp(@Body() dto: CreateUserDto) {
    return await this.authService.create(dto);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('me')
  @Version('1')
  async me(@UserDecorator() user: UserPayload) {
    return await this.authService.getMe(user);
  }
}
