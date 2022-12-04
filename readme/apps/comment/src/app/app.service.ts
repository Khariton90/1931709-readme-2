import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CommentsModel } from './comment.model';
import { Model } from 'mongoose';

@Injectable()
export class AppService {

  constructor(
    @InjectModel(CommentsModel.name) private readonly commentModel: Model<CommentsModel>,
    private readonly configService: ConfigService
  ) {
    console.log(configService.get<string>('database.name'))
  }
}
