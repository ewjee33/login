import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDao } from './dao/createUserDao';
import { UserDocument } from './user.schema';
import { ClientSession } from 'mongoose';
import { FindUserDao } from './dao/findUserDao';
import { UpdateUserDao } from './dao/updateUserDao';

@Injectable()
export class UserService {
    private readonly characters: string;
    private readonly numberOfCharacters: number;
    constructor (
    private readonly userRepository: UserRepository,
    ){
        this.characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()_+-=";
        this.numberOfCharacters = this.characters.length;
    }
    async createUser(createUserDao : CreateUserDao , session : ClientSession): Promise<UserDocument | null>{
        try {
            const newUser = await this.userRepository.createUser(createUserDao , session);
            return newUser;
        } catch (error){
            return null;
        }
    }

    async findUsers(findUserDao : FindUserDao , session : ClientSession , projectionOptions: any = null, findOptions: any = null , limitValue: number = 0): Promise<UserDocument[] | null>{
        try {
            const newUsers = await this.userRepository.findUsers(findUserDao , session , projectionOptions , findOptions , 0);
            return newUsers;
        } catch (error){
            return null;
        }
    }

    async findUser(findUserDao : FindUserDao , session : ClientSession , projectionOptions: any = null, findOptions: any = null): Promise<UserDocument | null>{
        try {
            const newUser = await this.userRepository.findUser(findUserDao , session , projectionOptions , findOptions);
            return newUser;
        } catch (error){
            return null;
        }
    }

    async updateUser(findUserDao : FindUserDao , updateUserDao : UpdateUserDao , session : ClientSession): Promise<UserDocument | null>{
        try {
            const newUser = await this.userRepository.updateUser(findUserDao , updateUserDao , session);
            return newUser;
        } catch (error){
            return null;
        }
    }

    async deleteUser(findUserDao : FindUserDao , session : ClientSession): Promise<boolean>{
        try {
            const deleted = await this.userRepository.deleteUser(findUserDao ,  session);
            return deleted;
        } catch (error){
            return false;
        }
    }

    generatePassword(): string {
        var password = ""
        for (let i = 0; i < 10; i++) {
            var randomNumber = this.getRandomNumberUpToEnd(this.numberOfCharacters);
            password += this.characters[randomNumber];
        }
        return password
    };

    getRandomNumberUpToEnd(end: number): number {
        const numOfGapsNeeded = end
        const gapSize = 1 / numOfGapsNeeded
        const randomNumber = Math.random()
        const quotient = Math.floor(randomNumber / gapSize)
        var result = 0
        for (let i = 0; i < quotient; i++) {
            result += 1
        }
        return result
    };

    generateId(): string {
        return uuidv4();
    };
}
