import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

@Module({
  imports : [], 
  controllers: [], 
  providers: [UserService , UserRepository], 
  exports: []
})
export class UserModule {}
