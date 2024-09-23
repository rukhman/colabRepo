import { Injectable } from '@nestjs/common';
import { User as UserModel} from "../../../database/models/users.model"
import { CreateUserDto, DeleteUserDto, EditUserDto, GetUserByEmailDto, GetUserDto, User, Users} from "proto/users"
import { InjectModel } from '@nestjs/sequelize';

const convertToProtoUser = (user: UserModel)  => {
  return {
    "id": user.id,
    "name": user.name,
    "email": user.email,
    "password": user.password,
    "role": user.role,
    "isActivated": user.isActivated,
    "activationLink": user.activationLink,
  }
};

@Injectable()
export class UsersService {
  constructor(@InjectModel(UserModel) private userModel: typeof UserModel) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.userModel.create({...createUserDto, role: "dolboyob", activationLink: "penis"});
      return convertToProtoUser(user);
    } catch (e) {
      return e;
    }
  }

  async getUsers(): Promise<Users> {
    try {
      const users = await this.userModel.findAll();
      return {"Users": [...users.map(user => {
      return convertToProtoUser(user);
    })]};
    } catch (e) {
      return e;
    }
  }

  async getUser(getUserDto: GetUserDto): Promise<User> {
    try {
      const user = await this.userModel.findOne({where: {id: getUserDto.id}});
      return convertToProtoUser(user);
    } catch (e) {
      return e;
    }
  }

  async getUserByEmail(getUserByEmailDto: GetUserByEmailDto): Promise<User> {
    try {
      const user = await this.userModel.findOne({where: {email: getUserByEmailDto.email}});
      return convertToProtoUser(user);
    } catch (e) {
      return e;
    }
  }

  async editUser(editUserDto: EditUserDto): Promise<User> {
    try {
      await this.userModel.update({...editUserDto}, {where: {id: editUserDto.id}});
      const user = await this.userModel.findOne({where: {id: editUserDto.id}});
      return convertToProtoUser(user);
    } catch (e) {
      return e;
    }
  }

  async deleteUser(deleteUserDto: DeleteUserDto): Promise<User> {
    try {
      const user = await this.userModel.findOne({where: {id: deleteUserDto.id}});
      await this.userModel.destroy({where: {id: deleteUserDto.id}});
      return convertToProtoUser(user);
    } catch (e) {
      return e;
    }
  }
}
