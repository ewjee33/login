import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDao {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}