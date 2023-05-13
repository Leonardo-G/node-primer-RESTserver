import { UsersService } from 'src/users/services/users.service';
import { AuthDTO } from '../dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/users/dto/users.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    login(authDTO: AuthDTO): Promise<{
        payload: string;
    }>;
    register(createUserDTO: CreateUserDTO): Promise<{
        payload: string;
    }>;
}
