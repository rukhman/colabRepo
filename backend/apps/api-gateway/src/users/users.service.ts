import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateUserDto, EditUserDto, GetUserByEmailDto, USERS_SERVICE_NAME, UsersServiceClient } from 'proto/users';
// import { CreateUserDto } from './dto/create-user.dto';

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

  findOne(id: string) {
    return this.usersServiceClient.getUser({id});
  }

  findOneEmail(getUserByEmailDto: GetUserByEmailDto) {
    return this.usersServiceClient.getUserByEmail(getUserByEmailDto);
  }

  update(updateUserDto: EditUserDto) {
    return this.usersServiceClient.editUser(updateUserDto);
  }

  remove(id: string) {
    return this.usersServiceClient.deleteUser({id});
  }
}
