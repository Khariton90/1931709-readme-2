import { LoginUserDto } from './dto/login-user.dto';
import { BlogUserEntity } from './../blog-user/blog-user.entity';
import { BlogUserMemoryRepository } from './../blog-user/blog-user-memory.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly blogUserMemoryRepository: BlogUserMemoryRepository
  ) {}

  async register(dto: CreateUserDto) {
    const { email, firstname, lastname, password, dateRegister } = dto;
    const blogUser = {
      _id: '',
      email, 
      firstname, 
      lastname, 
      passwordHash: '', 
      avatar: '', 
      dateRegister: dayjs(dateRegister).toDate(), 
      subscribers: 0, 
      posts: 0
    }

    const existUser = await this.blogUserMemoryRepository.findByEmail(email);

    if (existUser) {
      throw new Error('User already exists')
    }

    const userEntity = await new BlogUserEntity(blogUser).setPassword(password);
    return this.blogUserMemoryRepository.create(userEntity);
  }

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

    delete existUser.passwordHash;
    return { ...existUser }
  }

}
