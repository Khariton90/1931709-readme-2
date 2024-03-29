import { AuthRepository } from './auth.repository';
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
    private readonly authRepository: AuthRepository,
    private readonly blogUserService: BlogUserService,
    private readonly jwtService: JwtService,
  ) { }

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
      sub: user.id.toString(),
      email: user.email
    }

    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(
      payload,
      { expiresIn: '7d' }
    )

    await this.authRepository.findByUpdateOrCreate({ 
      userId: user.id, 
      refreshToken 
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken
    };
  }

  async refreshToken(refreshStr: string): Promise<string | undefined> {
    const userSub = await this.retrieveRefreshToken(refreshStr);
    if (!userSub) {
      return undefined;
    }

    const user = await this.blogUserService.findById(userSub);

    if (!user) {
      return undefined
    }

    const payload = {
      sub: user._id,
      email: user.email,
      dateRegister: user.dateRegister,
      lastname: user.lastname,
      firstname: user.firstname,
      avatar: user.avatar
    }

    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }

  async retrieveRefreshToken(refreshToken: string): Promise<string | undefined> {
    try {
      const { sub } = await this.jwtService.verifyAsync(refreshToken);
      return sub;
    } catch (e) {
      return undefined;
    }
  }

  async logout(refreshToken: string): Promise<void> {
    await this.authRepository.delete(refreshToken);
  }
}