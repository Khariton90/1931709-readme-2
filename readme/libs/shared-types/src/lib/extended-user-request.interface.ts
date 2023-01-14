import { Request } from '@nestjs/common/decorators';

export interface ExtendedUserRequest extends Request {
  user: {
    email: string
  };
}
