import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDao } from './dao/createUserDao';
import { UserDocument } from './user.schema';
import { ClientSession } from 'mongoose';
import { FindUserDao } from './dao/findUserDao';
import { UpdateUserDao } from './dao/updateUserDao';
import axios from 'axios';

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

    async registerConsumer(userId: string): Promise<string> {
        try {
            const consumerRegisterUrl = process.env.CONSUMER_REGISTER_URL ?? "API Gateway consumer register address"
            const newConsumerDetails = {
                "custom_id": userId
            }
            const consumerRegisterResult = await axios.post(consumerRegisterUrl, newConsumerDetails);
            let consumerId = consumerRegisterResult?.data?.id;
            if (consumerId) {
                return consumerId;
            } else {
                return "None";
            }
        } catch (error) {
            console.log("error in registerConsumer");
            console.log(error);
            return "None";
        }
    }

    async deleteOldApiKeys(listOfApiKeys: string[], consumerId: string): Promise<boolean> {
        try {
            if (listOfApiKeys.length == 0) {
                return true;
            }
            const deleteApiKeyURL= process.env.DELETE_API_KEY_URL?? "API Gateway api key deletion address";
            for (let i = 0; i < listOfApiKeys.length; i++) {
                let deleteApiKeyUrl = deleteApiKeyURL + consumerId + "/key-auth/" + listOfApiKeys[i]["key"];
                let deleteApiKeyResult = ((await axios.delete(deleteApiKeyUrl)).status == 204);
                if (deleteApiKeyResult == false) {
                    return false;
                }
            }
            return true;
        } catch (error) {
            console.log("Error in deleteOldApiKeys");
            console.log(error);
            return false;
        }
    }

    async createNewApiKey(consumerId: string): Promise<string> {
        try {
            const keyCreationUrlHead = process.env.KEY_CREATION_URL ?? "API Gateway api key creation address";
            const keyCreationUrlTail = "/key-auth";
            const keyCreationUrl = keyCreationUrlHead + consumerId + keyCreationUrlTail;
            const keyCreationResult = await axios.post(keyCreationUrl);
            let key = keyCreationResult?.data?.key;
            if (key) {
                return key;
            } else {
                return "None";
            }
        } catch (error) {
            console.log("Error in createNewApiKey");
            console.log(error);
            return "None";
        }
    }

    async findConsumerByUserId(userId: string): Promise<string> {
        try {
            const consumerDataUrl = process.env.CONSUMER_REGISTER_URL ?? "API Gateway Consumer Retrieve URL";
            var consumerRegisterUrlWithUsername = consumerDataUrl + "?custom_id=" + userId;
            const consumerData = await axios.get(consumerRegisterUrlWithUsername);
            let consumerId = consumerData?.data?.data?.[0]?.id;
            if (consumerId) {
                return consumerId;
            } else {
                return "None";
            }
        } catch (error) {
            console.log("error in getConsumerByUserId");
            console.log(error);
            return "None";
        }
    }

    async findKeysByConsumerId(consumerId: string): Promise<string[]> {
        try {
            const consumerURLHead = process.env.API_KEY_URL_HEAD ?? "API Gateway API Keys Retrieval URL"
            const consumerData = await axios.get(consumerURLHead + consumerId + "/key-auth")
            return consumerData?.data?.data
        } catch (error) {
            console.log("Registering New Consumer for user without one")
            return []
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
