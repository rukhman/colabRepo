import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "auth",
        transport: Transport.GRPC,
        options: {
          protoPath: join(__dirname, "../auth.proto"),
          package: "auth",
          url: "localhost:4000"
        }
      }
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
