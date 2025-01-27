import { IsEmail, IsNotEmpty, isNotEmpty } from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  name: string;

  address: string;
}
