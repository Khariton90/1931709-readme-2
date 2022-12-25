import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from 'class-validator';


export class LoginUserDto {
  @ApiProperty({
    description: 'The uniq user email of User',
    required: true,
    example: 'mail@gmail.com'
  })
  @IsEmail({}, {message: 'Invalid email'})
  public email: string;

  @ApiProperty({
    description: 'User password',
    required: true,
    example: '123456'
  })
  @IsString()
  public password: string;
}