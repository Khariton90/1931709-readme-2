import { BlogUserRepository } from './blog-user.repository';
import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as dayjs from 'dayjs';
import { BlogUserEntity } from './blog-user.entity';
import { ClientProxy } from '@nestjs/microservices';
import { createEvent } from '@readme/core';
import { CommandEvent } from '@readme/shared-types';
import { RABBITMQ_SERVICE } from './blog-user.constant';

@Injectable()
export class BlogUserService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy,
  ) {}

  async findByEmail(email: string) {
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new Error('User not found');
    }

    return existUser;
  }

  async register(dto: CreateUserDto) {
    const { email, firstname, lastname, password, dateRegister } = dto;
    const blogUser = {
      email, 
      firstname, 
      lastname, 
      passwordHash: '', 
      avatar: '', 
      dateRegister: dayjs(dateRegister).toDate(), 
      subscribers: 0, 
      posts: 0
    }

    const existUser = await this.blogUserRepository.findByEmail(email);

    if (existUser) {
      throw new Error('User already exists')
    }

    const userEntity = await new BlogUserEntity(blogUser).setPassword(password);
    const createUser = await this.blogUserRepository.create(userEntity);

    this.rabbitClient.emit(
      createEvent(CommandEvent.AddSubscriber),
      {
        id: createUser._id,
        firstname: createUser.firstname,
        lastname: createUser.lastname,
        email: createUser.email
      }
    )

    return createUser;
  }

  async findById(id: string) {
    const existUser = await this.blogUserRepository.findById(id);

    if (!existUser) {
      throw new Error('The user with this id was not found');
    }

    return existUser;
  }
}
