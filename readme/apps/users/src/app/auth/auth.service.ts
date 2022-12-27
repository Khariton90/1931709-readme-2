import { AUTH_USER_INVALID_PASSWORD } from './../app.constant';
import { BlogUserService } from './../blog-user/blog-user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { BlogUserEntity } from './../blog-user/blog-user.entity';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { AUTH_USER_NOT_FOUND } from '../app.constant';
import { ResponseUserDto } from '../blog-user/dto/response-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly blogUserService: BlogUserService,
    private readonly jwtService: JwtService
  ) {}

  async authorization(dto: LoginUserDto) {
    const { email, password } = dto;

    const existUser = await this.blogUserService.findByEmail(email);
    const correctPassword = await new BlogUserEntity(existUser).comparePassword(password);

    if (!existUser) {
      throw new UnauthorizedException(AUTH_USER_NOT_FOUND);
    }

    if (!correctPassword) {
      throw new UnauthorizedException(AUTH_USER_INVALID_PASSWORD);
    }

   return existUser;
  }

  async loginUser(user: ResponseUserDto) {
    const payload = {
      sub: user.id,
      email: user.email,
      dateRegister: user.dateRegister,
      lastname: user.lastname,
      firstname: user.firstname,
      avatar: user.avatar
    }

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        algorithm: 'HS256' 
      })
    ]);
  
    return {
      refresh_token: refreshToken,
      access_token:  accessToken
    };
  }
}
