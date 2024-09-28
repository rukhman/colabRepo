import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegLogDto, Tokens } from 'proto/auth';
import { Request, Response } from 'express';
import { ApiExcludeController, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TokensResponseDTO } from './dtos/responses/tokens-response.dto';
import { RegLogDTO } from './dtos/reg-log.dto';
import { RefreshTokenResponseDTO } from './dtos/responses/refreshToken-response.dto';

@ApiTags("auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({summary: "Регистрация нового пользователя"})
  @ApiResponse({status: 201, type: TokensResponseDTO, description: "refreshToken сохраняется в cookies"})
  @Post("registration")
  registration(@Body() registrationDto: RegLogDTO, @Res({passthrough: true}) res: Response) {
    const tokensRes = this.authService.registration(registrationDto).toPromise().then(tokens => {
      res.cookie("refreshToken", tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
      return tokens;
    });
    
    return tokensRes;
  }

  @ApiOperation({summary: "Логин пользователя"})
  @ApiResponse({status: 200, type: TokensResponseDTO, description: "refreshToken сохраняется в cookies"})
  @Post("login")
  login(@Body() loginDto: RegLogDTO, @Res({passthrough: true}) res: Response) {
    const tokensRes = this.authService.login(loginDto).toPromise().then(tokens => {
      res.cookie("refreshToken", tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
      return tokens;
    });
    
    return tokensRes;
  }

  @ApiOperation({summary: "Логаут пользователя. RefreshToken вытягивается из cookies"})
  @ApiResponse({status: 200, type: RefreshTokenResponseDTO, description: "RefreshToken удаляется из cookies"})
  @Post('logout')
  logout(@Req() req: Request, @Res({passthrough: true}) res: Response) {
    const {refreshToken} = req.cookies;
    const token = this.authService.logout({refreshToken});
    res.clearCookie("refreshToken");
    return token;
  }
  
  @ApiOperation({summary: "Обновление токенов"})
  @ApiResponse({status: 200, type: TokensResponseDTO})
  @Get("refresh")
  refresh(@Req() req: Request, @Res({passthrough: true}) res: Response) {
    const {refreshToken} = req.cookies;
    const tokensRes = this.authService.refresh({refreshToken}).toPromise().then(tokens => {
      res.cookie("refreshToken", tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
      return tokens;
    });
    
    return tokensRes;
  }

  @Get('activate/:link')
  async activate(@Param('link') link: string, @Res({passthrough: true}) res: Response) {
    await this.authService.activate({activationLink: link});
    return res.redirect(process.env.CLIENT_URL); //ссылка на главную страницу сайта
  }
}
