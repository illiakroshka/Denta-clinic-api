import {Controller, Get, NotFoundException, Param, ParseIntPipe} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('doctors')
  getDoctors(): object {
    return this.appService.getDoctors();
  }

  @Get('appointments')
  getAppointments(): object {
    return this.appService.getAppointments();
  }

  @Get('appointments/:id')
  async getDoctorId(@Param('id', ParseIntPipe) id: number) {
    const appointments = await this.appService.getDoctorAppointments(id);
    if (!appointments.length) {
      throw new NotFoundException('Information about doctor is not found');
    }
    return appointments;
  }
}
