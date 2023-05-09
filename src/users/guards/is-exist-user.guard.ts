import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

import { UsersService } from '../services/users.service';

@Injectable()
export class IsExistUserGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const email = request.body.email;

    const user = await this.usersService.findByEmail(email);

    if (user) {
      throw new BadRequestException(
        `the user with email: ${email} is already exists`,
      );
    }

    return true;
  }
}
