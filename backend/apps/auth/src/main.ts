import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory
    .createMicroservice<MicroserviceOptions>(AuthModule, {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, "../auth.proto"),
        package: "auth",
        url: "localhost:4000"
      }
    });
  app.listen();
}
bootstrap();
