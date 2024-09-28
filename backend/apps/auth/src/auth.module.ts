import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokensService } from './tokens/tokens.service';
import {ConfigModule} from "@nestjs/config"
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { SequelizeModule } from '@nestjs/sequelize';
import { MailService } from './mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { dbProvider } from '../../../database/db.provider';
import { Token } from '../../../database/models/tokens.model';
import { User } from 'database/models/users.model';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD
        }
      }
    }),
    dbProvider,
    SequelizeModule.forFeature([Token, User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, TokensService, MailService, JwtService],
})
export class AuthModule {}
