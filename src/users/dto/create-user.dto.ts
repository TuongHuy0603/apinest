import { Type } from 'class-transformer';
import { IsEmail, IsMongoId, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, ValidateNested } from 'class-validator';
import mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
//data transfer object // class = { }

class Company {
    @IsNotEmpty()
    _id: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty()
    name: string;
}

export class CreateUserDto {

    @IsNotEmpty({ message: 'Name không được để trống', })
    name: string;

    @IsEmail({}, { message: 'Email không đúng định dạng', })
    @IsNotEmpty({ message: 'Email không được để trống', })
    email: string;

    @IsNotEmpty({ message: 'Password không được để trống', })
    password: string;

    @IsNotEmpty({ message: 'Age không được để trống', })
    age: number;

    @IsNotEmpty({ message: 'Gender không được để trống', })
    gender: string;

    @IsNotEmpty({ message: 'Address không được để trống', })
    address: string;

    @IsNotEmpty({ message: 'Role không được để trống', })
    @IsMongoId({ message: 'Role có định dạng là mongo id', })
    role: mongoose.Schema.Types.ObjectId;

    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => Company)
    company: Company;
}

export class RegisterUserDto {

    @IsNotEmpty({ message: 'Name không được để trống', })
    name: string;

    @IsEmail({}, { message: 'Email không đúng định dạng', })
    @IsNotEmpty({ message: 'Email không được để trống', })
    email: string;

    @IsNotEmpty({ message: 'Password không được để trống', })
    password: string;

    @IsNotEmpty({ message: 'Age không được để trống', })
    age: number;

    @IsNotEmpty({ message: 'Gender không được để trống', })
    gender: string;

    @IsNotEmpty({ message: 'Address không được để trống', })
    address: string;
}

export class UserLoginDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'hoidanit', description: 'username' })
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: '123456',
        description: 'password',
    })
    readonly password: string;

}

