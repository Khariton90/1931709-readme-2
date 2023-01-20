import { Request } from '@nestjs/common/decorators';

export interface ExtendedUserRequest extends Request {
  user: {
    sub: string;
    email: string;
  };
}
