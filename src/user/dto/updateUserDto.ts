import { IsObject , IsOptional} from 'class-validator';
import { CreateUserDto } from './createUserDto';
import { PartialType } from '@nestjs/mapped-types' 

export class UpdateUserDto extends PartialType(CreateUserDto){
    @IsObject()
    @IsOptional()
    $set?: {
        email?: string;
        password?: string;
    };

    @IsObject()
    @IsOptional()
    $inc?: {
        score?: number;
    };
}