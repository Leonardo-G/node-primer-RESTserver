import { CanActivate, ExecutionContext } from '@nestjs/common';
import { UsersService } from '../services/users.service';
export declare class IsExistUserGuard implements CanActivate {
    private usersService;
    constructor(usersService: UsersService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
