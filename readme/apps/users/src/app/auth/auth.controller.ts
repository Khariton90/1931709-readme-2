import { ResponseUserDto } from './../blog-user/dto/response-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { Controller, Body, HttpStatus, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) {}

  @Get('login')
  @ApiResponse({status: HttpStatus.OK, description: 'User data received'})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Bad Request, invalid data format'})
  @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Invalid username or password'})
  async verifyUser(@Body() dto: LoginUserDto): Promise<ResponseUserDto> {
    const { _id, email, dateRegister, firstname, lastname } = await this.authService.authorization(dto);

    const userResponse = {
      id: _id,
      email,
      dateRegister,
      firstname,
      lastname
    }

    return userResponse;
  }
}
