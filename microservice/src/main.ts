import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from "@nestjs/common";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import * as path from "path";

const logger = new Logger('NestApplication')

async function bootstrap() {

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: 'localhost:50501',
      package: 'hello',
      protoPath: path.resolve(__dirname, 'proto/test.proto'),
    },
  });
  await app.listen();
}

bootstrap().then(() => {
  logger.log('Microservice server was started');
});
