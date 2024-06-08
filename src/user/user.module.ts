import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { SessionManager } from '../utils/sessionManager'
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { Logger } from 'src/utils/logger';

@Module({
  imports: [MongooseModule.forFeature([{name: "User", schema: UserSchema }])], 
  controllers: [UserController], 
  providers: [UserService , UserRepository , SessionManager , Logger], 
  exports: [UserService ]
})
export class UserModule {}
