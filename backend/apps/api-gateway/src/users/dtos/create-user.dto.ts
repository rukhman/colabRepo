import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsString, Length } from "class-validator";
import { CreateUserDto } from "proto/users";

export class CreateUserDTO implements CreateUserDto {
    @ApiProperty()
    @IsString({message: "Должно быть строкой"})
    name: string;

    @ApiProperty()
    @IsString({message: "Должно быть строкой"})
    @IsEmail({}, {message: "Некорректный email"})
    email: string;
    
    @ApiProperty()
    @IsString({message: "Должно быть строкой"})
    @Length(4, undefined, {message: "Пароль должен быть больше 4 символов"})
    password: string;
    
    @ApiProperty()
    @IsString({message: "Должно быть строкой"})
    role: string;
    
    @ApiProperty()
    @IsString({message: "Должно быть строкой"})
    activationLink: string;
}