import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/createUserDto';
import { FindUserDto } from 'src/user/dto/findUserDto';
import { UpdateUserDto } from 'src/user/dto/updateUserDto';
import { DeleteUserDto } from 'src/user/dto/deleteUserDto';
import { InjectConnection } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Logger } from 'src/utils/logger';
import { UserService } from './user.service';
import { SessionManager } from 'src/utils/sessionManager';
import { Response , Request} from 'express';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService ,
        private readonly logger: Logger,
        private readonly sessionService: SessionManager , 
        @InjectConnection() private readonly connection: mongoose.Connection,){}
    @Post()
    async create(@Req() req: Request , @Body() createUserDto: CreateUserDto) : Promise<Response> {
        const startTime : number = Date.now();
        const logMessage = [ req.originalUrl , userId ];
        const session = await this.sessionService.startSession();
        let shouldCommit = false;
        session.startTransaction();
        try {
            return this.logger.logAndSend(req.url, startTime, res, { result: "success", reason: "invalid input" , group : null } , "error" , logMessage)
        } catch (error){
            return this.logger.logAndSend(req.url, startTime, res, { result: "failure", reason: "invalid input" , group : null } , "error" , logMessage)
        } finally {
          if (shouldCommit){
              await session.commitTransaction();
              } else {
              await session.abortTransaction();
              }
          session.endSession();
        }
    }

    @Get()
    async findAll(@Req() req: Request , @Body() findUserDto: FindUserDto) : Promise<Response> {
        const startTime : number = Date.now();
        const logMessage = [ req.originalUrl , userId ];
        const session = await this.sessionService.startSession();
        let shouldCommit = false;
        session.startTransaction();
        try {

        } catch (error){

        } finally {
            if (shouldCommit){
                await session.commitTransaction();
                } else {
                await session.abortTransaction();
                }
            session.endSession();
        }
    }

    @Get(':id')
    async findOne(@Req() req: Request , @Param('id') findUserDto: FindUserDto) : Promise<Response> {
        const startTime : number = Date.now();
        const logMessage = [ req.originalUrl , userId ];
        const session = await this.sessionService.startSession();
        let shouldCommit = false;
        session.startTransaction();
        try {

        } catch (error){

        } finally {
            if (shouldCommit){
                await session.commitTransaction();
                } else {
                await session.abortTransaction();
                }
            session.endSession();
        }
    }

    @Put(':id')
    async update(@Req() req: Request ,@Param('id') id : number , @Body() updateUserDto: UpdateUserDto) : Promise<Response> {
        const startTime : number = Date.now();
        const logMessage = [ req.originalUrl , userId ];
        const session = await this.sessionService.startSession();
        let shouldCommit = false;
        session.startTransaction();
        try {

        } catch (error){

        } finally {
            if (shouldCommit){
                await session.commitTransaction();
                } else {
                await session.abortTransaction();
                }
                session.endSession();
        }
    }

    @Delete(':id')
    async delete(@Req() req: Request , @Param('id') id : number , @Body() deleteUserDto: DeleteUserDto) : Promise<Response>{
        const startTime : number = Date.now();
        const logMessage = [ req.originalUrl , userId ];
        const session = await this.sessionService.startSession();
        let shouldCommit = false;
        session.startTransaction();
        try {

        } catch (error){

        } finally {
            if (shouldCommit){
                await session.commitTransaction();
                } else {
                await session.abortTransaction();
                }
                session.endSession();
        }
    }
}
