import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";
import { YandexDto } from "proto/auth";

export class YandexDTO implements YandexDto {
    @ApiProperty()
    @IsString({message: "Должно быть строкой"})
    accessToken: string;
}