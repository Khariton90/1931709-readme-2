import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';

@ApiTags('comment')
@Controller('comment')
export class AppController {
  constructor(private readonly appService: AppService) {}

}
