import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory
    .createMicroservice<MicroserviceOptions>(UsersModule, {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, "../users.proto"),
        package: "users",
      }
    });
  app.listen();
}
bootstrap();
