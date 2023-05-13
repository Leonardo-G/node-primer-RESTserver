import { AuthDTO } from '../dto/auth.dto';
import { AuthService } from '../services/auth.service';
import { CreateUserDTO } from 'src/users/dto/users.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    authPost(authDTO: AuthDTO): Promise<{
        payload: string;
    }>;
    registerPost(createUserDTO: CreateUserDTO): Promise<{
        payload: string;
    }>;
}
