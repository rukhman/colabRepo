import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, EditUserDto, GetUserByEmailDto } from 'proto/users';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UserResponseDTO } from './dtos/responses/user-response.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';

@ApiTags("users")
@UseInterceptors(GrpcToHttpInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({summary: "Создание пользователя"})
  @ApiResponse({status: 201, type: UserResponseDTO})
  @Post()
  create(@Body() createUserDto: CreateUserDTO) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({summary: "Все пользователя"})
  @ApiResponse({status: 200, type: [UserResponseDTO]})
  @Get()
  findAll() {
    console.log("aslfd");
    return this.usersService.findAll();
  }

  @ApiOperation({summary: "Найти пользователя по email"})
  @ApiResponse({status: 200, type: UserResponseDTO})
  @ApiQuery({name: "email", description: "email пользователя"})
  @Get("/email")
  findOneEmail(@Query("email") email: string) {
    return this.usersService.findOneEmail({email});
  }
  
  @ApiOperation({summary: "Найти пользователя по id"})
  @ApiResponse({status: 200, type: UserResponseDTO})
  @ApiParam({name: "id", description: "id пользователя"})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({summary: "Изменить пользователя"})
  @ApiResponse({status: 200, type: UserResponseDTO})
  @Put()
  update(@Body() updateUserDto: UpdateUserDTO) {
    return this.usersService.update(updateUserDto);
  }

  @ApiOperation({summary: "Удалить пользователя"})
  @ApiResponse({status: 200, type: UserResponseDTO})
  @ApiParam({name: "id", description: "id пользователя"})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
