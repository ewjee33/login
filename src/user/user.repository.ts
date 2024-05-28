import { Injectable } from '@nestjs/common';
import { ClientSession, Model } from 'mongoose';
import { UserDocument } from './user.schema';
import { CreateUserDao } from 'src/Dao/createUserDao';
import { FindUserDao } from 'src/Dao/findUserDao';
import { UpdateUserDao } from 'src/Dao/updateUserDao';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}
  async createUser(createUserDao: CreateUserDao , session : ClientSession ): Promise<UserDocument> {
    const newUserArray = await this.userModel.create([createUserDao] , {session});
    const newUser = newUserArray[0];
    return newUser
  }

  //TODO - need to set {new : true} as default if not given but change it if so
  async updateUser(findUserDao: FindUserDao, updateUserDao: UpdateUserDao , session : ClientSession): Promise<UserDocument | null> {
      const updatedUser = await this.userModel.findOneAndUpdate(findUserDao, updateUserDao , {new : true}).session(session);
      if (!updatedUser) {
          return null
      }
      return updatedUser
  }

  async findUser(findUserDao: FindUserDao, session : ClientSession , projectionOptions: any = null, findOptions: any = null): Promise<UserDocument | null> {
      const foundUser = await this.userModel.findOne(findUserDao, projectionOptions , findOptions).session(session);
      if (!foundUser) {
          return null
      }
      return foundUser
  }

  async findUsers(findUserDao: FindUserDao, projectionOptions: any = null, findOptions: any = null , limitValue: number = null , clientSession : ClientSession): Promise<UserDocument[] | null> {
    const foundUsers = await this.userModel.find(findUserDao, projectionOptions, findOptions).limit(limitValue);
    if (!foundUsers) {
        return null
    }
    return foundUsers
  }

  async deleteUser(findUserDao: FindUserDao , clientSession : ClientSession): Promise<Boolean> {
    try {
      await this.userModel.deleteOne(findUserDao);
      return true;
    } catch (error) {
      console.log('Error in deleteUser');
      console.log(error);
      return false;
    }
  }
}
