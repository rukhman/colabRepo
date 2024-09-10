import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "users",
        transport: Transport.GRPC,
        options: {
          protoPath: join(__dirname, "../users.proto"),
          package: "users"
        }
      }
    ]) 
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
