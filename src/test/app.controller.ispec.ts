import { Test } from '@nestjs/testing';
import { AppModule } from "../app.module";
import { AppService } from "../app.service"
import * as request from 'supertest';
import { appointments, doctors, PrismaClient } from "@prisma/client";
import { doctorStub } from "./stubs/doctor.stub";
import { clientStub } from "./stubs/client.stub";

describe('AppController', () => {
  let appService: AppService;
  let prisma: PrismaClient;
  let doctor: doctors;
  let httpServer: any;
  let appointment: appointments;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule(({
      providers: [AppService],
      imports: [AppModule]
    })).compile()

    const app = moduleRef.createNestApplication();
    httpServer = app.getHttpServer();
    await app.init();
    prisma = new PrismaClient();
    appService = moduleRef.get<AppService>(AppService);

    doctor = await prisma.doctors.create({
      data: doctorStub()
    })
    appointment = await prisma.appointments.create({
      data:{
        appointment_id: 0,
        doctor_id: doctor.doctor_id,
        appointment_datetime: new Date(),
        is_available: true,
      }
    })
  })

  afterAll(async () => {
    await prisma.clients.deleteMany({
      where: {
        appointment_id: appointment.appointment_id,
      },
    });

    await prisma.appointments.deleteMany({
      where: {
        doctor_id: doctor.doctor_id,
      },
    });

    await prisma.doctors.delete({
      where:{
        doctor_id: doctor.doctor_id,
      }
    })
  })

  describe('getDoctors', () => {
    it('should return an array of doctors',async () => {
      const response = await request(httpServer).get('/doctors');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    })
  })

  describe('insertClient', () => {
    it('should insert client to the database and disable appointment', async () => {
      const appointmentId = appointment.appointment_id;
      const doctorId = doctor.doctor_id;
      const clientDto = clientStub();
      jest.spyOn(appService, 'disableAppointment').mockResolvedValue();
      const response = await request(httpServer)
        .post(`/doctors/${doctorId}/appointments/${appointmentId}`)
        .send(clientDto)
        .expect(201)

      expect(response.body.message).toBe('Appointment successfully booked');
      expect(appService.disableAppointment).toHaveBeenCalledWith(appointmentId);
    })
  })
})