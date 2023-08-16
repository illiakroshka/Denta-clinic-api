import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { DatabaseModule } from "./database/database.module";
import { clientStub } from "./stubs/client.stub";
import {appointments, doctors, PrismaClient} from "@prisma/client";
import { NotFoundException} from "@nestjs/common";

describe('AppService', () => {
  let appService: AppService;
  let prisma: PrismaClient;
  let doctor: doctors;
  let appointment: appointments;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
      imports: [DatabaseModule],
    }).compile();

    appService = module.get<AppService>(AppService);
    prisma = new PrismaClient();

    doctor = await prisma.doctors.create({
      data:{
        doctor_id: 0,
        first_name: 'doctorFirstName',
        last_name: 'doctorLastName',
        speciality: 'speciality',
        experience: 0,
        specialization: 'specialization',
        degree: 'degree',
        about: 'about',
        profile_picture: null,
      }
    })
    appointment = await prisma.appointments.create({
      data:{
        appointment_id: 0,
        doctor_id: doctor.doctor_id,
        appointment_datetime: new Date(),
        is_available: true,
      }
    })
  });

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

  describe('insertClient',() => {
    it('should insert the user when given correct appointment id', async () => {
      const appointmentId = appointment.appointment_id;
      const clientDto = clientStub();
      const result = await appService.insertClient(clientDto, appointmentId);
      expect(result).toBeDefined();
    });

    it('should throw the error when given incorrect appointment id', async () => {
      const incorrectAppointmentId = -1;
      const clientDto = clientStub();
      try {
        await appService.insertClient(clientDto, incorrectAppointmentId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Information about appointment is not found');
      }
    })
  });
});
