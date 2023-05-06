import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { constansGlobal } from './constants';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(constansGlobal.urlDatabase),
  ],
  exports: [MongooseModule],
})
export class GlobalModuleModule {}
