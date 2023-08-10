import {Controller, Get, NotFoundException, Param, ParseIntPipe} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('doctors')
  getDoctors(): object {
    return this.appService.getDoctors();
  }

  @Get('doctors/:id')
  async getDoctorById(@Param('id', ParseIntPipe) id: number) {
    const doctor = await this.appService.getDoctorById(id);
    if (!doctor){
      throw new NotFoundException('Information about doctor is not found');
    }
    return doctor;
  }

  @Get('doctors/:id/appointments')
  async getDoctorAppointments(@Param('id', ParseIntPipe) id: number){
    const appointments = await this.appService.getDoctorAppointments(id);
    if (!appointments.length) {
      throw new NotFoundException(`Information about doctor's appointments is not found`);
    }
    return appointments;
  }

  @Get('doctors/:id/appointments/:appointmentId')
  async getAppointmentByID(
    @Param('id', ParseIntPipe) doctorId: number,
    @Param('appointmentId', ParseIntPipe) appointmentId: number,
  ) {
    const appointment = await this.appService.getAppointmentById(doctorId, appointmentId);
    if (!appointment) {
      throw new NotFoundException(`Information about appointment is not found`);
    }
    return appointment;
  }

  @Get('appointments')
  getAppointments(): object {
    return this.appService.getAppointments();
  }
}
