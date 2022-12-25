import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    description: 'The uniq user email of User',
    required: true,
    example: 'mail@gmail.com'
  })
  @IsEmail({}, {
    message: 'invalid email'
  })
  public email: string;

  @ApiProperty({
    description: 'Date format to ISO string',
    required: true,
    example: '2022-11-01T21:00:00.000Z'
  })
  public dateRegister: string;

  @ApiProperty({
    description: 'User firstname',
    required: true,
    example: 'Evgeniy'
  })
  @IsString()
  public firstname: string;

  @ApiProperty({
    description: 'User lastname',
    required: true,
    example: 'Kharitonov'
  })
  @IsString()
  public lastname: string;

  @ApiProperty({
    description: 'User password',
    required: true,
    example: '123456'
  })
  @IsString()
  public password: string;
}