import { HttpException, HttpStatus, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/sequelize';
import { ActivateDto, LogoutDto, RefreshDto, RegLogDto, Tokens, YandexDto } from 'proto/auth';
import { CreateUserDto, USERS_SERVICE_NAME, UsersServiceClient } from 'proto/users';
import * as bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";
import { MailService } from './mail/mail.service';
import { Token } from '../../../database/models/tokens.model';
import { TokensService } from './tokens/tokens.service';
import { UserPayloadDto } from './dto/user-payload.dto';
import { User } from 'database/models/users.model';
import { GrpcAlreadyExistsException, GrpcInvalidArgumentException, GrpcNotFoundException, GrpcUnknownException } from 'nestjs-grpc-exceptions';

@Injectable()
export class AuthService{

  constructor(private mailService: MailService, private tokenService: TokensService){}

  async registration(registrationDto: RegLogDto) {
    const res = await fetch(`http://localhost:3000/users/email?email=${registrationDto.email}`);
    const candidate = await res.json();
    if (candidate.email) {
      throw new GrpcAlreadyExistsException(`Пользователь с почтовым адресом ${registrationDto.email} уже существует`);
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
    await this.mailService.sendActivationMail(registrationDto.email, `${process.env.API_URL}/auth/activate/${activationLink}`);


    const userDto = new UserPayloadDto(user);
    
    const tokens = this.tokenService.generateTokens({...userDto});
    await this.tokenService.saveToken(userDto.id, tokens.refreshToken);

    return tokens;
  }

  async login(loginDto: RegLogDto) {
    const res = await fetch(`http://localhost:3000/users/email?email=${loginDto.email}`);
    const user = await res.json();
    if (!user.email) {
      throw new GrpcNotFoundException(`Пользователь с почтовым адресом ${loginDto.email} не найден`);
    }
    const isPassEquals = await bcrypt.compare(loginDto.password, user.password);
    if (!isPassEquals) {
      throw new GrpcInvalidArgumentException(`Некорректный пароль`);
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
      throw new GrpcNotFoundException(`Не авторизован`);
    }
    const userData = this.tokenService.validateRefreshToken(refreshDto.refreshToken);
    const tokenFromDB = await this.tokenService.findToken(refreshDto.refreshToken);
    if(!userData || !tokenFromDB) {
      throw new GrpcUnknownException("Ошибка авторизации");
    }
    const res = await fetch(`http://localhost:3000/users/email?email=${userData.email}`);
    const user = await res.json();
    const userDto = new UserPayloadDto(user);
    const tokens = this.tokenService.generateTokens({...userDto});

    await this.tokenService.saveToken(userDto.id, tokens.refreshToken);
    return tokens;
  }

  async activate(activateDto: ActivateDto) {
    const user = await User.findOne({where: {activationLink: activateDto.activationLink}});
    if (!user) {
      throw new GrpcInvalidArgumentException("Некорректная ссылка активации");
    }
    await fetch("http://localhost:3000/users", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "PUT",
      body: JSON.stringify({
        id: user.dataValues.id,
        name: user.dataValues.name,
        email: user.dataValues.email,
        password: user.dataValues.password,
        role: user.dataValues.role,
        activationLink: user.dataValues.activationLink,
        isActivated: true})
    });
  }

  async yandex(yandexDto: YandexDto) {
    const res = await fetch("https://login.yandex.ru/info?format=json", {
      headers: {
        Authorization: yandexDto.accessToken
      }
    })
    const userInfo = await res.json();
    const candidate = await User.findOne({where: {email: userInfo.default_email}});

    if (candidate) {
      return await this.login({email: userInfo.default_email, password: userInfo.id});
    } else {
      return await this.registration({email: userInfo.default_email, password: userInfo.id});
    }
  }
}
