import { ApiProperty } from "@nestjs/swagger";
import { EditUserDto, User } from "proto/users";

export class UpdateUserDTO implements EditUserDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    role: string;

    @ApiProperty()
    isActivated: boolean;

    @ApiProperty()
    activationLink: string;
}