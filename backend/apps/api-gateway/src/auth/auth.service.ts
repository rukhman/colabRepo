import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ActivateDto, AUTH_SERVICE_NAME, AuthServiceClient, LogoutDto, RefreshDto, RegLogDto } from 'proto/auth';

@Injectable()
export class AuthService implements OnModuleInit{
  private authServiceClient: AuthServiceClient;

  constructor(@Inject("auth") private clientGrpc: ClientGrpc) {}

  onModuleInit() {
    this.authServiceClient =
      this.clientGrpc.getService<AuthServiceClient>
      (AUTH_SERVICE_NAME);
  }

  registration(registrationDto: RegLogDto) {
    return this.authServiceClient.registration(registrationDto);
  }

  login(loginDto: RegLogDto) {
    return this.authServiceClient.login(loginDto);
  }

  logout(logoutDto: LogoutDto) {
    return this.authServiceClient.logout(logoutDto);
  }

  refresh(refreshDto: RefreshDto) {
    return this.authServiceClient.refresh(refreshDto);
  }

  async activate(activateDto: ActivateDto) {
    return await this.authServiceClient.activate(activateDto).toPromise();
  }
}
