import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class ChangePasswordDto {
  @ApiProperty({
    description: 'Current password',
    required: true,
    example: '123456'
  })
  @IsString()
  public currentPassword: string;

  @ApiProperty({
    description: 'New password',
    required: true,
    example: '123456'
  })
  @IsString()
  @MinLength(6, { message: 'Min Length password is 6' })
  @MaxLength(12, { message: 'Max Length password is 12' })
  public newPassword: string;
}