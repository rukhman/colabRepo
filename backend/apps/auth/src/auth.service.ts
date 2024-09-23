import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/sequelize';
import { LogoutDto, RefreshDto, RegLogDto, Tokens } from 'proto/auth';
import { CreateUserDto, USERS_SERVICE_NAME, UsersServiceClient } from 'proto/users';
import * as bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";
import { MailService } from './mail/mail.service';
import { Token } from '../../../database/models/tokens.model';
import { TokensService } from './tokens/tokens.service';
import { UserPayloadDto } from './dto/user-payload.dto';
import { User } from 'database/models/users.model';

@Injectable()
export class AuthService{

  constructor(private mailService: MailService, private tokenService: TokensService, 
    ) {}

  async registration(registrationDto: RegLogDto) {
    const res = await fetch(`http://localhost:3000/users/email?email=${registrationDto.email}`);
    const candidate = await res.json();
    if (candidate.email) {
      throw new Error(`Пользователь с почтовым адресом ${registrationDto.email} уже существует`);
    }
    const hashedPassword = await bcrypt.hash(registrationDto.password, 3);
    const activationLink = uuid();

    const createUserRes = await fetch("http://localhost:3000/users", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({...registrationDto, password: hashedPassword, name: registrationDto.email, role: "USER", activationLink})
    });
    const user = await createUserRes.json();
    await this.mailService.sendActivationMail(registrationDto.email, activationLink);


    const userDto = new UserPayloadDto(user);
    
    const tokens = this.tokenService.generateTokens({...userDto});
    await this.tokenService.saveToken(userDto.id, tokens.refreshToken);

    return tokens;
  }

  async login(loginDto: RegLogDto) {
    const res = await fetch(`http://localhost:3000/users/email?email=${loginDto.email}`);
    const user = await res.json();
    if (!user.email) {
      throw new Error(`Пользователь с почтовым адресом ${loginDto.email} не найден`);
    }
    const isPassEquals = await bcrypt.compare(loginDto.password, user.password);
    if (!isPassEquals) {
      throw new Error(`Некорректный пароль`);
    }
    const userDto = new UserPayloadDto(user);
    const tokens = this.tokenService.generateTokens({...userDto});

    await this.tokenService.saveToken(userDto.id, tokens.refreshToken);
    return tokens;
  }

  async logout(logoutDto: LogoutDto) {
    const refreshToken = await this.tokenService.removeToken(logoutDto.refreshToken);
    return {refreshToken};
  }

  async refresh(refreshDto: RefreshDto) {
    if (!refreshDto.refreshToken) {
      throw new Error(`Не авторизован`);
    }
    const userData = this.tokenService.validateRefreshToken(refreshDto.refreshToken);
    const tokenFromDB = await this.tokenService.findToken(refreshDto.refreshToken);
    if(!userData || !tokenFromDB) {
      throw new Error("Ошибка авторизации");
    }
    const res = await fetch(`http://localhost:3000/users/email?email=${userData.email}`);
    const user = await res.json();
    const userDto = new UserPayloadDto(user);
    const tokens = this.tokenService.generateTokens({...userDto});

    await this.tokenService.saveToken(userDto.id, tokens.refreshToken);
    return tokens;
  }
}
