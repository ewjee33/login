import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { SessionManager } from '../utils/sessionManager'
import { UserController } from './user.controller';

@Module({
  imports : [], 
  controllers: [UserController], 
  providers: [UserService , UserRepository , SessionManager], 
  exports: [UserController]
})
export class UserModule {}
