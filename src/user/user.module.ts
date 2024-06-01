import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { SessionManager } from '../utils/sessionManager'
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: "User", schema: UserSchema }])], 
  controllers: [UserController], 
  providers: [UserService , UserRepository , SessionManager], 
  exports: [UserController]
})
export class UserModule {}
