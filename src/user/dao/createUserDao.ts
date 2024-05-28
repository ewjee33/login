import { IsNotEmpty, IsDate , IsString } from 'class-validator';

export class CreateUserDao {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @IsDate()
  @IsNotEmpty()
  signedIn: Date;
}