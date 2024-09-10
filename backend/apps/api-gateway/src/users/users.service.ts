import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { USERS_SERVICE_NAME, UsersServiceClient } from 'proto/users';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService implements OnModuleInit{
  private usersServiceClient: UsersServiceClient;

  constructor(@Inject("users") private clientGrpc: ClientGrpc) {}

  onModuleInit() {
    this.usersServiceClient =
      this.clientGrpc.getService<UsersServiceClient>
      (USERS_SERVICE_NAME);
  }

  create(createUserDto: CreateUserDto) {
    return this.usersServiceClient.createUser(createUserDto);
  }

  findAll() {
    return this.usersServiceClient.getUsers({});
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
