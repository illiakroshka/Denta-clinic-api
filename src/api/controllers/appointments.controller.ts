import { Controller, Get, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { AppointmentsService } from '../services/appointments.service';
import { AuthGuard } from '../../security/auth.guard';
import { DoctorByIdPipe } from '../pipes/DoctorByIdPipe';
import { AppointmentByIdPipe } from '../pipes/AppointmentByIdPipe';

@Controller('appointments')
export class AppointmentsController {
  constructor (
    private appointmentsService: AppointmentsService,
  ) {}

  @Get()
  async getActiveAppointments () {
    return this.appointmentsService.getActiveAppointments();
  }

  @Get('/:appointmentId')
  async getAppointment (
   @Param('appointmentId', ParseIntPipe, AppointmentByIdPipe) appointmentId: number
  ) {
    return this.appointmentsService.getAppointment(appointmentId);
  }

  @Get('/doctors/:doctorId')
  async getDoctorAppointments (
    @Param('doctorId', ParseIntPipe, DoctorByIdPipe) doctorId: number
  ) {
    return this.appointmentsService.getDoctorsAppointments(doctorId);
  }

  @UseGuards(AuthGuard)
  @Post('/:appointmentId')
  async bookAppointment (
    @Param('appointmentId', ParseIntPipe, AppointmentByIdPipe) appointmentId: number,
    @Request() req,
  ) {
    return this.appointmentsService.bookAppointment(req.user.sub, appointmentId);
  }
}
