import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GrpcMethod } from '@nestjs/microservices';
import { ActivateDto, AuthServiceController, LogoutDto, RefreshDto, RefreshToken, RegLogDto, Tokens } from 'proto/auth';

@Controller()
export class AuthController implements AuthServiceController{
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod("AuthService", "Registration")
  async registration(registrationDto: RegLogDto): Promise<Tokens> {
    return await this.authService.registration(registrationDto);
  }
  
  @GrpcMethod("AuthService", "Login")
  async login(loginDto: RegLogDto): Promise<Tokens> {
    return await this.authService.login(loginDto);
  }

  @GrpcMethod("AuthService", "Logout")
  async logout(logoutDto: LogoutDto): Promise<RefreshToken> {
    return await this.authService.logout(logoutDto);
  }

  @GrpcMethod("AuthService", "Activate")
  async activate(activateDto: ActivateDto) {
    return await this.authService.activate(activateDto);
  }

  @GrpcMethod("AuthService", "Refresh")
  async refresh(refreshDto: RefreshDto): Promise<Tokens> {
    return await this.authService.refresh(refreshDto);
  }
}
