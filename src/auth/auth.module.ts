import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './services/auth.service';
import { AuthController } from './controller/auth.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRETPRIVATEKEY,
      signOptions: { expiresIn: '1D' },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
