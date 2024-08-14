import { Controller, Get, Param, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  // @UseGuards(AdminGuard) TODO: Имплементация AdminGuard для ограничения прав доступа на основе ролей
  @Version('1')
  async getUsers() {
    return await this.userService.findAll();
  }

  @Get(':id')
  // @UseGuards(AdminGuard) TODO: Имплементация AdminGuard для ограничения прав доступа на основе ролей
  @Version('1')
  async getUser(@Param('id') id: string) {
    return await this.userService.findOneById(Number(id));
  }
}
