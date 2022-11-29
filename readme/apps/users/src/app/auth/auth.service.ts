import { LoginUserDto } from './dto/login-user.dto';
import { BlogUserEntity } from './../blog-user/blog-user.entity';
import { BlogUserMemoryRepository } from './../blog-user/blog-user-memory.repository';
import { Injectable } from '@nestjs/common';
import { BlogUserService } from '../blog-user/blog-user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly blogUserMemoryRepository: BlogUserMemoryRepository,
    private readonly blogUserService: BlogUserService
  ) {}

  async authorization(dto: LoginUserDto) {
    const { email, password } = dto;

    const existUser = await this.blogUserMemoryRepository.findByEmail(email);
    const correctPassword = await new BlogUserEntity(existUser).comparePassword(password);

    if (!existUser) {
      throw new Error('User not found')
    }

    if (!correctPassword) {
      throw new Error('Invalid password')
    }

    return this.blogUserService.findUserDetails(email);
  }

}
