import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";

export class ResponseUserDto {
  @ApiProperty({
    description: 'The uniq user ID',
    required: true,
    example: "63a876cf2c2c81e05bc97598"
  })
  @Transform(({obj}) => obj._id.toString())
  @Expose({name: '_id'})
  public id: string;

  @ApiProperty({
    description: 'The uniq user email of User',
    required: true,
    example: 'mail@gmail.com'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'Date format to ISO string',
    required: true,
    example: '2022-01-19T21:00:00.000Z'
  })
  @Expose()
  public dateRegister: Date;

  @ApiProperty({
    description: 'User firstname',
    required: true,
    example: 'Evgeniy'
  })
  @Expose()
  public firstname: string;

  @ApiProperty({
    description: 'User lastname',
    required: true,
    example: 'Kharitonov'
  })
  @Expose()
  public lastname: string;

  @ApiProperty({
    description: 'user avatar',
    example: 'image.jpg'
  })
  @Expose()
  public avatar: string;

}