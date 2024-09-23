import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegLogDto } from 'proto/auth';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("registration")
  registration(@Body() registrationDto: RegLogDto, @Res({passthrough: true}) res: Response) {
    const tokensRes = this.authService.registration(registrationDto).toPromise().then(tokens => {
      res.cookie("refreshToken", tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
      return tokens;
    });
    
    return tokensRes;
  }

  @Post("login")
  login(@Body() loginDto: RegLogDto, @Res({passthrough: true}) res: Response) {
    const tokensRes = this.authService.login(loginDto).toPromise().then(tokens => {
      res.cookie("refreshToken", tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
      return tokens;
    });
    
    return tokensRes;
  }

  @Post('logout')
  logout(@Req() req: Request, @Res({passthrough: true}) res: Response) {
    const {refreshToken} = req.cookies;
    const token = this.authService.logout({refreshToken});
    res.clearCookie("refreshToken");
    return token;
  }
  
  @Get("refresh")
  refresh(@Req() req: Request, @Res({passthrough: true}) res: Response) {
    const {refreshToken} = req.cookies;
    const tokensRes = this.authService.refresh({refreshToken}).toPromise().then(tokens => {
      res.cookie("refreshToken", tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
      return tokens;
    });
    
    return tokensRes;
  }

  // @Get(':id')
  // activate(@Param('id') id: string) {
  //   // return this.authService.update(+id, updateAuthDto);
  // }
}
