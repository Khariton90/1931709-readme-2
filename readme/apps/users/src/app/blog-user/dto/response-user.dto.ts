import { ApiProperty } from "@nestjs/swagger";

export class ResponseUserDto {
  @ApiProperty({
    description: 'The uniq user ID',
    required: true,
    example: "6cb74fda-d5b9-4105-b674-c6c932c288a0"
  })
  public id: string;

  @ApiProperty({
    description: 'The uniq user email of User',
    required: true,
    example: 'mail@gmail.com'
  })
  public email: string;

  @ApiProperty({
    description: 'Date format to ISO string',
    required: true,
    example: '2022-01-19T21:00:00.000Z'
  })
  public dateRegister: Date;

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
}