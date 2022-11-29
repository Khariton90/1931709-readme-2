import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    description: 'The uniq user email of User',
    required: true,
    example: 'mail@gmail.com'
  })
  public email: string;

  @ApiProperty({
    description: 'Date format to ISO string',
    required: true,
    example: '2022-11-02'
  })
  public dateRegister: string;

  @ApiProperty({
    description: 'User firstname',
    required: true,
    example: 'Evgeniy'
  })
  public firstname: string;

  @ApiProperty({
    description: 'User lastname',
    required: true,
    example: 'Kharitonov'
  })
  public lastname: string;

  @ApiProperty({
    description: 'User password',
    required: true,
    example: '123456'
  })
  public password: string;
}