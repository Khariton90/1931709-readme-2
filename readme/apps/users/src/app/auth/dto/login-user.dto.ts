import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
  @ApiProperty({
    description: 'The uniq user email of User',
    required: true,
    example: 'mail@gmail.com'
  })
  public email: string;

  @ApiProperty({
    description: 'User password',
    required: true,
    example: '123456'
  })
  public password: string;
}