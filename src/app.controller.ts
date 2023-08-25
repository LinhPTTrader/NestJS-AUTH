import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config/dist';
import { Public } from './auth/decorator/customize';

@Controller()
export class AppController {
  constructor
    (private readonly appService: AppService,
    ) { }


  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
