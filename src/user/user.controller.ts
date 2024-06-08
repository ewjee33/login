import { Body, Controller, Delete, Get, Param, Post, Put, Req , Res} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/createUserDto';
import { FindUserDto } from 'src/user/dto/findUserDto';
import { UpdateUserDto } from 'src/user/dto/updateUserDto';
import { DeleteUserDto } from 'src/user/dto/deleteUserDto';
import { InjectConnection } from '@nestjs/mongoose';
import mongoose, { ClientSession } from 'mongoose';
import { Logger } from 'src/utils/logger';
import { UserService } from './user.service';
import { SessionManager } from 'src/utils/sessionManager';
import { Response , Request} from 'express';
import { CreateUserDao } from './dao/createUserDao';
import { UserDocument } from './user.schema';
import { FindUserDao } from './dao/findUserDao';
import { UpdateUserDao } from './dao/updateUserDao';
import { LoginUserDto } from './dto/loginUserDto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService ,
        private readonly logger: Logger,
        private readonly sessionService: SessionManager , 
        @InjectConnection() private readonly connection: mongoose.Connection,
        ){}

    @Post()
    async create(@Req() req: Request , @Res() res: Response, @Body() createUserDto: CreateUserDto) : Promise<Response> {
        const startTime = Date.now();
        const logMessage = [ req.originalUrl ];
        const session : ClientSession = await this.sessionService.startSession();
        let shouldCommit : boolean = false;
        session.startTransaction();
        try {
            const userId : string = createUserDto["userId"];
            const password : string = createUserDto["password"];
            const createUserDao : CreateUserDao = { userId , password };
            const newUser : UserDocument | null = await this.userService.createUser(createUserDao , session);
            if (newUser){
                shouldCommit = true;
                return this.logger.logAndSend(req.url, startTime, res, { result: "success", reason: "" , user : newUser } , "error" , logMessage)    
            }
            return this.logger.logAndSend(req.url, startTime, res, { result: "failure", reason: "creating user failed" , user : null } , "error" , logMessage)
        } catch (error){
            return this.logger.logAndSend(req.url, startTime, res, { result: "failure", reason: "" , group : null } , "error" , logMessage)
        } finally {
          if (shouldCommit){
              await session.commitTransaction();
              } else {
              await session.abortTransaction();
              }
          await session.endSession();
        }
    }

    @Post('/apikey')
    async login(@Req() req: Request , @Res() res: Response, @Body() loginUserDto: LoginUserDto) : Promise<Response> {
        const startTime = Date.now();
        const logMessage = [ req.originalUrl ];
        const session : ClientSession = await this.sessionService.startSession();
        session.startTransaction();
        try {
            const userId : string = loginUserDto["userId"];
            const password : string = loginUserDto["password"];
            const findUserDao : FindUserDao = { userId , password };
            const user : UserDocument | null = await this.userService.findUser(findUserDao , session);
            if (user){
                //TODO - apikey 
                return this.logger.logAndSend(req.url, startTime, res, { result: "success", reason: "" , apikey : "apikey" } , "info" , logMessage)    
            }
            return this.logger.logAndSend(req.url, startTime, res, { result: "failure", reason: "no user found" , apikey : null } , "error" , logMessage)
        } catch (error){
            return this.logger.logAndSend(req.url, startTime, res, { result: "failure", reason: "" , apikey : null } , "error" , logMessage)
        } finally {
            await session.abortTransaction();
            await session.endSession();
        }
    }

    @Get()
    async findAll(@Req() req: Request , @Res() res: Response) : Promise<Response> {
        const userId = req.headers["userId"] ?? "";
        const startTime = Date.now();
        const logMessage = [ req.originalUrl , userId ];
        const session : ClientSession = await this.sessionService.startSession();
        try {
            const findUserDao : FindUserDto = {};
            const allUsers : UserDocument[] | null = await this.userService.findUsers(findUserDao , session);
            if (allUsers){
                return this.logger.logAndSend(req.url, startTime, res, { result: "success", reason: "" , users : allUsers } , "info" , logMessage)    
            }
            return this.logger.logAndSend(req.url, startTime, res, { result: "failure", reason: "find users failed" , users : null } , "error" , logMessage)
        } catch (error){
            return this.logger.logAndSend(req.url, startTime, res, { result: "failure", reason: "" , users : null } , "error" , logMessage)
        } 
    }

    @Get(':id')
    async findOne(@Req() req: Request , @Res() res: Response, @Param('id') id: string) : Promise<Response> {
        const userId = req.headers["userId"] ?? "";
        const startTime = Date.now();
        const logMessage = [ req.originalUrl , userId ];
        const session = await this.sessionService.startSession();
        session.startTransaction();
        try {
            const findUserDao : FindUserDao = {_id : id};
            const foundUser : UserDocument | null = await this.userService.findUser(findUserDao , session);
            if (foundUser){
                return this.logger.logAndSend(req.url, startTime, res, { result: "success", reason: "" , user : foundUser } , "info" , logMessage)    
            }
            return this.logger.logAndSend(req.url, startTime, res, { result: "failure", reason: "user not found" , user : null } , "error" , logMessage)    
        } catch (error){
            return this.logger.logAndSend(req.url, startTime, res, { result: "failure", reason: "" , user : null } , "error" , logMessage)    
        } finally {
            await session.abortTransaction();
            await session.endSession();
        }
    }

    @Put(':id/password')
    async update(@Req() req: Request , @Res() res: Response , @Param('id') id : string , @Body() updateUserDto: UpdateUserDto) : Promise<Response> {
        const userId = req.headers["userId"] ?? "";
        const startTime = Date.now();
        const logMessage = [ req.originalUrl , userId ];
        const session = await this.sessionService.startSession();
        let shouldCommit = false;
        session.startTransaction();
        try {
            const findUserDao : FindUserDao = {_id : id};
            const updateUserDao : UpdateUserDao = updateUserDto;
            const updatedUser : UserDocument | null = await this.userService.updateUser(findUserDao , updateUserDao , session);
            if (updatedUser){
                shouldCommit = true;
                return this.logger.logAndSend(req.url, startTime, res, { result: "success", reason: "" , user : updatedUser } , "info" , logMessage)    
            }
            return this.logger.logAndSend(req.url, startTime, res, { result: "failure", reason: "updating user failed" , user : null } , "error" , logMessage)    
        } catch (error){
            return this.logger.logAndSend(req.url, startTime, res, { result: "failure", reason: "" , user : null } , "error" , logMessage)
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
    async delete(@Req() req: Request , @Res() res: Response , @Param('id') id : string) : Promise<Response>{
        const userId = req.headers["userId"] ?? "";
        const startTime = Date.now();
        const logMessage = [ req.originalUrl , userId ];
        const session = await this.sessionService.startSession();
        let shouldCommit = false;
        session.startTransaction();
        try {
            const findUserDao : FindUserDao = {_id : id};
            const deleted : boolean = await this.userService.deleteUser(findUserDao , session);
            if (deleted){
                shouldCommit = true;
                return this.logger.logAndSend(req.url, startTime, res, { result: "success", reason: "" } , "info" , logMessage)    
            }
            return this.logger.logAndSend(req.url, startTime, res, { result: "failure", reason: "deleting user failed"} , "error" , logMessage)    
        } catch (error){
            return this.logger.logAndSend(req.url, startTime, res, { result: "failure", reason: ""} , "error" , logMessage)    
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
