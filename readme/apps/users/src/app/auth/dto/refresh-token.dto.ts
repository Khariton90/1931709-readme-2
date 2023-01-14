import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsString()
  public userId: string;

  @IsString()
  public refreshToken: string;
}