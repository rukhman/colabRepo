import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { dbProvider } from '../../../database/db.provider';
import { User } from '../../../database/models/users.model';
import { APP_FILTER } from '@nestjs/core';
import { GrpcServerExceptionFilter } from 'nestjs-grpc-exceptions';

@Module({
  imports: [dbProvider, SequelizeModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService,
    {
      provide: APP_FILTER,
      useClass: GrpcServerExceptionFilter,
    }
  ],
})
export class UsersModule {}
