import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    if (!createUserDto.username) {
        throw new BadRequestException('Username is required');
    }
     // Check if a user with the same username already exists
     const existingUser = await this.userRepository.findOne({ where: { username: createUserDto.username } });
     if (existingUser) {
       throw new ConflictException('Username already exists');
     }
     
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }
  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }
}
