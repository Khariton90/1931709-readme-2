import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { Controller, Body, HttpStatus, Post, Delete } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('/')
  @ApiResponse({ status: HttpStatus.OK, description: 'User data received' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request, invalid data format' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Invalid username or password' })
  async verifyUser(@Body() dto: LoginUserDto) {
    const { _id, email, dateRegister, firstname, lastname, avatar } = await this.authService.authorization(dto);

    return this.authService.loginUser({
      id: _id,
      email,
      dateRegister,
      firstname,
      lastname,
      avatar
    });
  }

  @Post('/refresh')
  async refreshToken(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshToken(dto.refreshToken);
  }

  @Delete('/logout')
  async logout(@Body() dto: RefreshTokenDto) {
    await this.authService.logout(dto.refreshToken);
  }
}
