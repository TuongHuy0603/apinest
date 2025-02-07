import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDate,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
  IsBoolean,
} from 'class-validator';
import mongoose, { Types } from 'mongoose';

class Company {
  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  name: string;
}
export class CreateJobDto {
  @IsNotEmpty({ message: 'Tên công việc không được để trống' })
  name: string;

  @IsArray({ message: 'SKill có định dạng là array' })
  @IsString({ each: true, message: 'Mỗi skill phải là string' })
  @IsNotEmpty({ message: 'Kỹ năng không được để trống' })
  skill: string[];

  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @IsString()
  password: string;

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  company: Company;

  @IsNotEmpty({ message: 'Lương không được để trống' })
  @IsNumber()
  salary: number;

  @IsNotEmpty({ message: 'Số lượng không được để trống' })
  @IsNumber()
  quantity: number;

  @IsNotEmpty({ message: 'Level không được để trống' })
  @IsString()
  level: string;

  @IsNotEmpty({ message: 'Mô tả công việc không được để trống' })
  @IsString()
  description: string;

  @IsNotEmpty({ message: 'Ngày bắt đầu không được để trống' })
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'startDate có định dạng Date' })
  startDate: Date;

  @IsNotEmpty({ message: 'Ngày kết thúc không được để trống' })
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'endDate có định dạng Date' })
  endDate: Date;

  @IsNotEmpty({ message: 'Mô tả công việc không được để trống' })
  @IsBoolean({ message: 'isActive có định dạng là boolean' })
  isActive: boolean;
}
