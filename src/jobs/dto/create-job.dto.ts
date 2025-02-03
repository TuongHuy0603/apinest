import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDate,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateJobDto {
  @IsNotEmpty({ message: 'Tên công việc không được để trống' })
  @IsString()
  name: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ message: 'Kỹ năng không được để trống' })
  skill: string[];

  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @IsString()
  password: string;

  @IsNotEmpty({ message: 'Công ty không được để trống' })
  company: {
    _id: Types.ObjectId;
    name: string;
  };

  @IsNotEmpty({ message: 'Lương không được để trống' })
  @IsNumber()
  salary: number;

  @IsNotEmpty({ message: 'Số lượng không được để trống' })
  @IsNumber()
  quantity: number;

  @IsNotEmpty({ message: 'Cấp độ không được để trống' })
  @IsString()
  level: string;

  @IsNotEmpty({ message: 'Mô tả công việc không được để trống' })
  @IsString()
  description: string;

  @IsNotEmpty({ message: 'Ngày bắt đầu không được để trống' })
  @IsDate()
  startDate: Date;

  @IsNotEmpty({ message: 'Ngày kết thúc không được để trống' })
  @IsDate()
  endDate: Date;
}
