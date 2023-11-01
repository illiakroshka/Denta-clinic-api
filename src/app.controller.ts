import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post, Request, UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './security/auth.guard';
import { ReviewsMapper } from './mappers/ReviewsMapper';

@ApiTags('doctors')
@Controller()
export class AppController {
  constructor (
    private appService: AppService,
    private reviewMapper: ReviewsMapper,
  ) {}

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

  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('doctors/:id/appointments/:appointmentId')
  async bookAppointment(
    @Param('appointmentId', ParseIntPipe) appointmentId: number,
    @Param('id', ParseIntPipe) doctorId: number,
    @Request() req,
  ) {
    const appointment = await this.appService.getAppointmentById(doctorId, appointmentId);
    if (!appointment) {
      throw new NotFoundException(`Information about appointment is not found`);
    }
    await this.appService.disableAppointment(appointmentId);
    await this.appService.bookAppointment(req.user.sub, appointmentId);
    return { message: 'Appointment successfully booked' };
  }
}
