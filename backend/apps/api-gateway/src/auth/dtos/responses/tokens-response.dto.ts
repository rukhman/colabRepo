import { ApiProperty } from "@nestjs/swagger";
import { Tokens } from "proto/auth";

export class TokensResponseDTO implements Tokens {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}