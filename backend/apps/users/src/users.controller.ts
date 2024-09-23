import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateUserDto, DeleteUserDto, EditUserDto, GetUserByEmailDto, GetUserDto, User, Users, UsersServiceController } from 'proto/users';

@Controller()
export class UsersController implements UsersServiceController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod("UsersService", "CreateUser")
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.createUser(createUserDto);
  }
  
  @GrpcMethod("UsersService", "GetUsers")
  async getUsers(): Promise<Users> {
    return await this.usersService.getUsers();
  }
  @GrpcMethod("UsersService", "GetUser")
  async getUser(getUserDto: GetUserDto): Promise<User> {
    return await this.usersService.getUser(getUserDto);
  }
  @GrpcMethod("UsersService", "GetUserByEmail")
  async getUserByEmail(getUserByEmailDto: GetUserByEmailDto): Promise<User> {
    return await this.usersService.getUserByEmail(getUserByEmailDto);
  }
  @GrpcMethod("UsersService", "EditUser")
  async editUser(editUserDto: EditUserDto): Promise<User> {
    return await this.usersService.editUser(editUserDto);
  }
  @GrpcMethod("UsersService", "DeleteUser")
  async deleteUser(deleteUserDto: DeleteUserDto): Promise<User> {
    return await this.usersService.deleteUser(deleteUserDto);
  }

}
