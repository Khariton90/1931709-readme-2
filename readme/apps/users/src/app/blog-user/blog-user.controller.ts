import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { BlogUserService } from './blog-user.service';
import { plainToClass } from 'class-transformer';
import { ResponseUserDto } from './dto/response-user.dto';


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
  async create(@Body() dto: CreateUserDto): Promise<ResponseUserDto> {
    const { _id, email, dateRegister, firstname, lastname } = await this.blogUserService.register(dto);

    return plainToClass(ResponseUserDto, {
      id: _id,
      email,
      dateRegister,
      firstname,
      lastname
    });
  }
}
