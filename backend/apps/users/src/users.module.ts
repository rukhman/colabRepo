import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { dbProvider } from './db/db.provider';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './db/models/users.model';

@Module({
  imports: [dbProvider, SequelizeModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
