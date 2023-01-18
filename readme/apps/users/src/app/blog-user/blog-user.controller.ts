import { ResponseSpecificUserDto } from './dto/response-specific-user.dto';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { CheckMongoidValidationPipe } from './../pipes/CheckMongoidValidationPipe';
import { Param, Patch } from '@nestjs/common/decorators';
import { Body, Controller, HttpStatus, Post, Get, UseGuards, Req } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { BlogUserService } from './blog-user.service';
import { plainToClass } from 'class-transformer';
import { ResponseUserDto } from './dto/response-user.dto';
import { ChangePasswordDto } from './dto/change-password-dto';
import { ExtendedUserRequest } from '@readme/shared-types';

@ApiTags('user')
@Controller('user')
export class BlogUserController {
  constructor(
    private readonly blogUserService: BlogUserService
  ) {}

  @Post('register')
  @ApiResponse({status: HttpStatus.CREATED, description: 'The new user has been created'})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Bad Request, invalid data format'})
  @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Such a user already exists'})
  async create(@Body() dto: CreateUserDto) {
    const { _id, email, dateRegister, firstname, lastname, avatar } = await this.blogUserService.register(dto);

    return plainToClass(ResponseUserDto, {
      _id,
      email,
      dateRegister,
      firstname,
      lastname,
      avatar
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiResponse({status: HttpStatus.OK, description: 'The user was received by :id'})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'The user is not logged in'})
  async show(@Param('id', CheckMongoidValidationPipe) id: string) {
      const { dateRegister, posts, subscribers, _id } = await this.blogUserService.findById(id);

      return plainToClass(ResponseSpecificUserDto, {
        dateRegister,
        posts,
        subscribers,
        _id,
      })
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/changePassword')
  @ApiResponse({status: HttpStatus.OK, description: 'Password changed successfully'})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'The user is not logged in'})
  async changePassword(@Body() changePasswordDto: ChangePasswordDto, @Req() { user }: ExtendedUserRequest) {
    const { 
      _id, 
      email, 
      dateRegister, 
      firstname, 
      lastname, 
      avatar 
    } = await this.blogUserService.findByEmailAndChangePassword(changePasswordDto, user.email);

    return plainToClass(ResponseUserDto, {
      _id,
      email,
      dateRegister,
      firstname,
      lastname,
      avatar
    })
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/subscribe/:id')
  @ApiResponse({status: HttpStatus.OK, description: 'Subscribing/unsubscribing to a user'})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'The user is not logged in'})
  async subscribe(@Param('id', CheckMongoidValidationPipe) id: string, @Req() { user }: ExtendedUserRequest) {
    await this.blogUserService.subscribe(user.email, id);
  }
}
