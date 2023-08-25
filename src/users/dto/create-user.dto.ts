import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsString, MaxLength } from "class-validator";

export class CreateUserDto {

    @IsEmail({}, { message: "Email không đúng định dạng" })
    @IsString()
    @IsNotEmpty({ message: "Email không được để trống" })
    email: string

    @IsNotEmpty({ message: "Password không được để trống" })
    password: string

    name: string


    phone: string


    age: number
}
