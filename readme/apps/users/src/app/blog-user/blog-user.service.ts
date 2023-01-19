import { ChangePasswordDto } from './dto/change-password-dto';
import { BlogUserRepository } from './blog-user.repository';
import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as dayjs from 'dayjs';
import { BlogUserEntity } from './blog-user.entity';
import { ClientProxy } from '@nestjs/microservices';
import { changePassword, createEvent } from '@readme/core';
import { CommandEvent } from '@readme/shared-types';
import { RABBITMQ_SERVICE, SALT_ROUNDS, USER_NOT_FOUND_MESSAGE } from './blog-user.constant';
import { compare } from 'bcrypt';

@Injectable()
export class BlogUserService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy,
  ) {}

  async findByEmail(email: string) {
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new BadRequestException(USER_NOT_FOUND_MESSAGE);
    }

    return existUser;
  }

  async register(dto: CreateUserDto) {
    const { email, firstname, lastname, password, dateRegister, avatar } = dto;
    const blogUser = {
      email, 
      firstname, 
      lastname, 
      passwordHash: '', 
      avatar, 
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
        id: createUser._id.toString(),
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
      throw new BadRequestException(USER_NOT_FOUND_MESSAGE);
    }

    return existUser;
  }

  async findByEmailAndChangePassword(changePasswordDto: ChangePasswordDto, email: string) {
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new Error('The user with this email was not found');
    }

    const correctPassword = await compare(changePasswordDto.currentPassword, existUser.passwordHash);

    if (!correctPassword) {
      throw new Error('Passwords don`t match');
    }

    const newPassword = await changePassword(changePasswordDto.newPassword, SALT_ROUNDS);
    const newEntity = new BlogUserEntity({...existUser, passwordHash: newPassword});
    const updateUser = await this.blogUserRepository.update(existUser._id, newEntity);
    return updateUser;
  }

  async subscribe(email: string, id: string) {
    await this.blogUserRepository.subscribe(email, id);
  }
}