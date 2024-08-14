import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.entity';
import { USER_REPOSITORY } from '../../core/constants';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    return await this.userRepository.create<User>(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll<User>();
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({
      rejectOnEmpty: undefined,
      where: { email },
    });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({
      rejectOnEmpty: undefined,
      where: { id },
    });
  }

  async findOneByIdWithoutPassword(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({
      rejectOnEmpty: undefined,
      where: { id },
      attributes: { exclude: ['password'] },
    });
  }
}
