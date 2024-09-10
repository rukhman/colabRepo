import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateUserDto, DeleteUserDto, EditUserDto, GetUserDto, User, Users, UsersServiceController } from 'proto/users';

@Controller()
export class UsersController implements UsersServiceController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod("UsersService", "CreateUser")
  createUser(createUserDto: CreateUserDto): User {
    return {
      id: "1",
      name: null,
      email: null,
      password: null,
      role: "penis"
    }
  }
  
  @GrpcMethod("UsersService", "GetUsers")
  getUsers(): Users {
    return {Users: [{
      id: "все работает, я просто охуенен",
      name: "жаль не дотягиваюсь до члена",
      email: "сделал бы себе минет",
      password: null,
      role: null,
    }]};
  }
  @GrpcMethod("UsersService", "GetUser")
  getUser(getUserDto: GetUserDto): User {
    return null;
  }
  @GrpcMethod("UsersService", "EditUser")
  editUser(editUserDto: EditUserDto): User {
    return null;
  }
  @GrpcMethod("UsersService", "DeleteUser")
  deleteUser(deleteUser: DeleteUserDto): User {
    return null;
  }

}
