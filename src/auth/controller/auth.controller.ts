import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { AuthDTO } from '../dto/auth.dto';
import { AuthService } from '../services/auth.service';
import { CreateUserDTO } from 'src/users/dto/users.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  authPost(@Body() authDTO: AuthDTO) {
    try {
      return this.authService.login(authDTO);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('register')
  registerPost(@Body() createUserDTO: CreateUserDTO) {
    try {
      return this.authService.register(createUserDTO);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
