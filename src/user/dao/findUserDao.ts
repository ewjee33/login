import { CreateUserDao } from './createUserDao';
import { PartialType } from '@nestjs/mapped-types' 

export class FindUserDao extends PartialType(CreateUserDao){
    _id? : string;
}