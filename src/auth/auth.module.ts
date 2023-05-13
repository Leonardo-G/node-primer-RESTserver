import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UsersService } from 'src/users/services/users.service';
import { AuthService } from './services/auth.service';
import { AuthController } from './controller/auth.controller';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRETPRIVATEKEY,
      signOptions: { expiresIn: '1D' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [UsersService],
})
export class AuthModule {}
