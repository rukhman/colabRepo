import { ApiProperty } from "@nestjs/swagger";
import { RegLogDto } from "proto/auth";

export class RegLogDTO implements RegLogDto {
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}