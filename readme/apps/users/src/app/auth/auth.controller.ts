import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('register')
  async create(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }
}
