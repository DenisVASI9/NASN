import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonService } from "./common.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, CommonService],
})
export class AppModule {}
