import { ApiProperty } from "@nestjs/swagger";
import { User } from "proto/users";

export class UserResponseDTO implements User {
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