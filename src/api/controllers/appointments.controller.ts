import { Controller, Get, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { AppointmentsService } from '../services/appointments.service';
import { AuthGuard } from '../../security/auth.guard';

@Controller('appointments')
export class AppointmentsController {
  constructor (
    private appointmentsService: AppointmentsService,
  ) {}

  @Get()
  async getActiveAppointments () {
    const ActiveAppointments = await this.appointmentsService.getActiveAppointments();
    return ActiveAppointments;
  }

  @Get('/:appointmentId')
  async getAppointment (
   @Param('appointmentId', ParseIntPipe) appointmentId: number
  ) {
    const appointment = await this.appointmentsService.getAppointment(appointmentId);
    return appointment;
  }

  @Get('/doctors/:doctorId')
  async getDoctorAppointments (
    @Param('doctorId', ParseIntPipe) doctorId: number
  ) {
    const DoctorAppointments = await this.appointmentsService.getDoctorsAppointments(doctorId);
    return DoctorAppointments;
  }

  @UseGuards(AuthGuard)
  @Post('/:appointmentId')
  async bookAppointment (
    @Param('appointmentId', ParseIntPipe) appointmentId: number,
    @Request() req,
  ) {
    const data = await this.appointmentsService.bookAppointment(req.user.sub, appointmentId);
    return data;
  }
}
