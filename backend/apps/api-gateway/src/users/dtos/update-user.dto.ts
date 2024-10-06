import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsString, Length } from "class-validator";
import { EditUserDto, User } from "proto/users";

export class UpdateUserDTO implements EditUserDto {
    @ApiProperty()
    id: string;

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
    @IsBoolean({message: "Может иметь только true или false значение"})
    isActivated: boolean;
    
    @ApiProperty()
    @IsString({message: "Должно быть строкой"})
    activationLink: string;
}