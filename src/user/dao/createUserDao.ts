import { IsNotEmpty, IsDate , IsString, IsBoolean } from 'class-validator';

export class CreateUserDao {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  consumerId : string;

}