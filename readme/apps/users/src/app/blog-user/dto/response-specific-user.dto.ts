import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";

export class ResponseSpecificUserDto {
  @ApiProperty({
    description: 'Date format to ISO string',
    required: true,
    example: '2022-01-19T21:00:00.000Z'
  })
  @Expose()
  public dateRegister: Date;

  @ApiProperty({
    description: 'Number of user posts',
    required: true,
    example: '1'
  })
  @Expose()
  public posts: number;

  @ApiProperty({
    description: 'Number of user subscribers',
    required: true,
    example: '1'
  })
  @Expose()
  public subscribers: number;

  @ApiProperty({
    description: 'The uniq user ID',
    required: true,
    example: "63a876cf2c2c81e05bc97598"
  })
  @Transform(({ obj }) => obj._id.toString())
  @Expose({ name: '_id'})
  public id: string;
}