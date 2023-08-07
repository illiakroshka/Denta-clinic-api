import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('doctors')
  getDoctors(): object {
    return this.appService.getDoctors();
  }
}
