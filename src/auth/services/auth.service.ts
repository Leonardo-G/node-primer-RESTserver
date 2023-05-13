import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { AuthDTO } from '../dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(authDTO: AuthDTO) {
    const user = await this.usersService.findByEmail(authDTO.email);

    if (!user) {
      throw new BadRequestException(
        `User with email ${authDTO.email} does not exist`,
      );
    }

    //compare password
    const validatePassword = bcrypt.compareSync(
      authDTO.password,
      user.password,
    );

    if (!validatePassword) {
      throw new UnauthorizedException(`Email/password incorrect`);
    }

    const payload = await this.jwtService.signAsync({ id: user._id });

    return payload;
  }
}
