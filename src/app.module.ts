import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GlobalModuleModule } from './global-module/global-module.module';

@Module({
  imports: [UsersModule, GlobalModuleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
