import { ApiProperty } from "@nestjs/swagger";
import { CreateUserDto } from "proto/users";

export class CreateUserDTO implements CreateUserDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;
    
    @ApiProperty()
    password: string;
    
    @ApiProperty()
    role: string;
    
    @ApiProperty()
    activationLink: string;
}