import { RefreshTokenDto } from './dto/refresh-token.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { AuthModel } from './auth.model';
import { Model } from 'mongoose';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(AuthModel.name) private readonly authModel: Model<AuthModel>
  ) { }

  async create(refreshToken: RefreshTokenDto) {
    const token = new this.authModel(refreshToken);
    return token.save();
  }

  async findByUpdateOrCreate(refreshTokenDto: RefreshTokenDto): Promise<RefreshTokenDto | null> {
    const existToken = await this.authModel.findOneAndUpdate(
      { userId: refreshTokenDto.userId }, 
      { refreshTokenDto }, {new: true}
      );

    if (existToken) {
      return existToken;
    }

    const token = await this.create(refreshTokenDto);
    return token;
  }

  async delete(refreshToken: string): Promise<void> {
    await this.authModel.findOneAndDelete({ refreshToken });
  }
}