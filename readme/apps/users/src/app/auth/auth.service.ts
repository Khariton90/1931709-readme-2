import { BlogUserService } from './../blog-user/blog-user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { BlogUserEntity } from './../blog-user/blog-user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly blogUserService: BlogUserService,
  ) {}

  async authorization(dto: LoginUserDto) {
    const { email, password } = dto;

    const existUser = await this.blogUserService.findByEmail(email);
    const correctPassword = await new BlogUserEntity(existUser).comparePassword(password);

    if (!correctPassword) {
      throw new Error('Invalid password')
    }

   return existUser;
  }
}
