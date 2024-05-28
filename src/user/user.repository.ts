import { Injectable } from '@nestjs/common';
import { ClientSession, Model } from 'mongoose';
import { UserDocument } from './user.schema';
import { CreateUserDto } from 'src/dto/createUserDto';
import { FindUserDto } from 'src/dto/findUserDto';
import { UpdateUserDto } from 'src/dto/updateUserDto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserRepository {
  @InjectModel('Login' , 'user')
  private readonly userModel: Model<UserDocument>,
  async createUser(createUserDto: CreateUserDto , session : ClientSession ): Promise<UserDocument> {
    const newUserArray = await this.userModel.create([createUserDto] , {session});
    const newUser = newUserArray[0];
    return newUser
  }

  async updateUser(findUserDto: FindUserDto, updateUserDto: UpdateUserDto , session : ClientSession): Promise<UserDocument> | null {
      const updatedUser = await this.userModel.findOneAndUpdate(findUserDto, updateUserDto , {new : true}).session(session);
      if (!updatedUser) {
          return null
      }
      return updatedUser
  }

  async findUser(findUserDto: FindUserDto, session : ClientSession , projectionOptions: any = null, findOptions: any = null): Promise<UserDocument> | null {
      const foundUser = await this.userModel.findOne(findUserDto, projectionOptions , findOptions).session(session);
      if (!foundUser) {
          return null
      }
      return foundUser
  }

  async findUsers(findUserDto: FindUserDto, projectionOptions: any = null, findOptions: any = null , limitValue: number | null = null , clientSession : ClientSession): Promise<UserDocument[]> | null {
    const foundUsers = await this.userModel.find(findUserDto, projectionOptions, findOptions).limit(limitValue);
    if (!foundUsers) {
        return null
    }
    return foundUsers
  }

  async deleteUser(findUserDto: FindUserDto , clientSession : ClientSession): Promise<Boolean> {
    try {
      await this.userModel.deleteOne(findUserDto);
      return true;
    } catch (error) {
      console.log('Error in deleteUser');
      console.log(error);
      return false;
    }
  }
}
