import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDao } from './createUserDao';
import { PartialType } from '@nestjs/mapped-types' 

export class UpdateUserDao extends PartialType(CreateUserDao){
}