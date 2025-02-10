import { IsNotEmpty } from 'class-validator';

//data transfer object // class = { }


export class CreatePermissionDto {

    @IsNotEmpty({ message: 'name không được để trống', })
    name: string;

    @IsNotEmpty({ message: 'apiPath không được để trống', })
    apiPath: string;

    @IsNotEmpty({ message: 'method không được để trống', })
    method: string;

    @IsNotEmpty({ message: 'module không được để trống', })
    module: string;

}
