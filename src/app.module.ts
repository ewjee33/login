import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal : true}), 
    UserModule , 
    MongooseModule.forRoot(process.env.DB_URL ?? "DB URL")
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
