import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";
import { RegLogDto } from "proto/auth";

export class RegLogDTO implements RegLogDto {
    @ApiProperty()
    @IsString({message: "Должно быть строкой"})
    @IsEmail({}, {message: "Некорректный email"})
    email: string;

    @ApiProperty()
    @IsString({message: "Должно быть строкой"})
    @Length(4, undefined, {message: "Пароль должен быть больше 4 символов"})
    password: string;
}