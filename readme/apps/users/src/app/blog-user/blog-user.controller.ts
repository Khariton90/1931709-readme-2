import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { BlogUserService } from './blog-user.service';

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
    return this.blogUserService.register(dto);
  }
}