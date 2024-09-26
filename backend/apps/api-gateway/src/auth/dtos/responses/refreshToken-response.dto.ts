import { ApiProperty } from "@nestjs/swagger";
import { RefreshToken, Tokens } from "proto/auth";

export class RefreshTokenResponseDTO implements RefreshToken {
  @ApiProperty()
  refreshToken: string;
}