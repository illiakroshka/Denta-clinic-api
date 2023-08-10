import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database.service';

@Injectable()
export class AppointmentRepository {
  constructor(
    private prisma: DatabaseService,
  ) {}

  async getAppointments() {
    return this.prisma.appointments.findMany({
      where:{
        is_available: true,
      }
    });
  }

  async getDoctorAppointments(doctorId: number){
    return this.prisma.appointments.findMany({
      where:{
        doctor_id: doctorId,
        is_available: true,
      }
    })
  }

  async getAppointmentById(doctorId : number, appointmentId: number){
    return this.prisma.appointments.findUnique({
      where:{
        doctor_id: doctorId,
        appointment_id: appointmentId,
      }
    })
  }
}