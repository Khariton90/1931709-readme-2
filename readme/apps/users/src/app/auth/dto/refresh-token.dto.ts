import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'User Id',
    required: true,
    example: '63c2b0cbc468e6a7d2342f7d'
  })
  @IsString()
  public userId: string;

  @ApiProperty({
    description: 'Saved user refresh password',
    required: true,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2M2MyYjBjYmM0NjhlNmE3ZDIzNDJmN2QiLCJlbWFpbCI6IjFAbWFpbC5ydSIsImlhdCI6MTY3MzcwMzYzNiwiZXhwIjoxNjc0MzA4NDM2fQ.Aw_yf4uSGN6xafeS6r4aRkS1Pth_XG6DFzJP58zkKrM'
  })
  @IsString()
  public refreshToken: string;
}