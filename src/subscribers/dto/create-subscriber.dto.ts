import { IsArray, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateSubscriberDto {
    @IsNotEmpty({ message: 'Name không được để trống', })
    name: string;

    @IsEmail({}, { message: 'Email không đúng định dạng', })
    @IsNotEmpty({ message: 'Email không được để trống', })
    email: string;

    @IsNotEmpty({ message: 'skills không được để trống', })
    @IsArray({ message: 'skills có định dạng là array', })
    // "each" tells class-validator to run the validation on each item of the array
    @IsString({ each: true, message: "skill định dạng là string" })
    skills: string[];

}
