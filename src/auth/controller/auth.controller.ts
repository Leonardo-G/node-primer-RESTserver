import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { AuthDTO } from '../dto/auth.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  authPost(@Body() authDTO: AuthDTO) {
    try {
      return this.authService.login(authDTO);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
