import { Expose } from 'class-transformer';
import { IsEmail, IsOptional, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    description: 'The uniq user email of User',
    required: true,
    example: 'mail@gmail.com'
  })
  @IsEmail({unique: true}, {
    message: 'invalid email'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'Date format to ISO string',
    required: true,
    example: '2022-11-01T21:00:00.000Z'
  })
  @Expose()
  public dateRegister: string;

  @ApiProperty({
    description: 'User firstname',
    required: true,
    example: 'Evgeniy'
  })
  @Expose()
  @IsString()
  @MinLength(5, { message: 'Min Length firstname is 5' })
  @MaxLength(50, { message: 'Max Length firstname is 50' })
  public firstname: string;

  @ApiProperty({
    description: 'User lastname',
    required: true,
    example: 'Kharitonov'
  })
  @Expose()
  @IsString()
  public lastname: string;

  @ApiProperty({
    description: 'User password',
    required: true,
    example: '123456'
  })
  @Expose()
  @IsString()
  @MinLength(6, { message: 'Min Length password is 6' })
  @MaxLength(12, { message: 'Max Length password is 12' })
  public password: string;

  @ApiProperty({
    description: 'User avatar',
    example: 'image.jpg'
  })
  @Expose()
  @IsString()
  @IsOptional()
  public avatar?: string
}