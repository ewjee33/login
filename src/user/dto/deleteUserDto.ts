import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from './createUserDto';
import { PartialType } from '@nestjs/mapped-types' 

export class DeleteUserDto extends PartialType(CreateUserDto){
}