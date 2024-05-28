import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/createUserDto';
import { FindUserDto } from 'src/user/dto/findUserDto';
import { UpdateUserDto } from 'src/user/dto/updateUserDto';
import { DeleteUserDto } from 'src/user/dto/deleteUserDto';

@Controller('user')
export class UserController {
    @Post()
    create(@Body() createUserDto: CreateUserDto) : Promise<Response> {
        try {

        } catch (error){

        } finally {

        }
        return 'This action adds a new user';
    }

    @Get()
    findAll(@Body() findUserDto: FindUserDto) : Promise<Response> {
        try {

        } catch (error){

        } finally {
            
        }
        return 'This action finds a new user';
    }

    @Get(':id')
    findOne(@Param('id') findUserDto: FindUserDto) : Promise<Response> {
        try {

        } catch (error){

        } finally {
            
        }
        return 'This action finds a new user';
    }

    @Put(':id')
    update(@Param('id') id : number , @Body() updateUserDto: UpdateUserDto) : Promise<Response> {
        try {

        } catch (error){

        } finally {
            
        }
        return 'This action updates a new user';
    }

    @Delete(':id')
    delete(@Param('id') id : number , @Body() deleteUserDto: DeleteUserDto) : Promise<Response>{
        try {

        } catch (error){

        } finally {
            
        }
        return 'This action deletes a new user';
    }
}
