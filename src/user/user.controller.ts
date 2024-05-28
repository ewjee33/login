import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/createUserDto';
import { FindUserDto } from 'src/dto/findUserDto';
import { UpdateUserDto } from 'src/dto/updateUserDto';

@Controller('user')
export class UserController {
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return 'This action adds a new user';
    }

    @Get()
    read(@Body() findUserDto: FindUserDto) {
        return 'This action finds a new user';
    }

    @Put()
    update(@Body() updateUserDto: UpdateUserDto) {
        return 'This action updates a new user';
    }

    @Delete()
    delete(@Body() findUserDto: FindUserDto) {
        return 'This action adds a new user';
    }
}
