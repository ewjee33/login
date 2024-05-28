import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/createUserDto';

@Controller('user')
export class UserController {
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return 'This action adds a new user';
    }
}
