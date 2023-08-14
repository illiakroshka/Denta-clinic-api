import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import {DatabaseModule} from "./database/database.module";
import { NotFoundException } from '@nestjs/common';
import {CreateClientDTO} from "./dtos/CreateClientDTO";

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
      imports: [DatabaseModule],
    }).compile();

    appService = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(appService).toBeDefined();
  });

  describe('getDoctorById',() => {
    it('should return a doctor when given a valid id',async () => {
      const mockDoctor = {
        "doctor_id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "speciality": "Cardiologist",
        "experience": 10,
        "specialization": "Heart Specialist",
        "degree": "MD",
        "about": "Dr. John Doe is a skilled cardiologist...",
        "profile_picture": null
      };
      jest.spyOn(appService, 'getDoctorById').mockResolvedValue(mockDoctor);
      const result = await appService.getDoctorById(1);
      expect(result).toEqual(mockDoctor);
    })

    it('should throw NotFoundException when doctor is not found', async () => {
      jest.spyOn(appService, 'getDoctorById').mockResolvedValue(null);
      try {
        await appService.getDoctorById(-1);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Information about doctor is not found');
      }
    });
  })

  describe('getAppointmentByID',() => {
    it('should return an appointment when given valid doctorId and appointmentId', async () => {
      const mockAppointment = {
        "appointment_id": 1,
        "doctor_id": 1,
        "appointment_datetime": new Date("2023-08-30T15:45:00.000Z"),
        "is_available": true
      }
      jest.spyOn(appService, 'getAppointmentById').mockResolvedValue(mockAppointment);

      const result = await appService.getAppointmentById(1,1);

      expect(result).toEqual(mockAppointment);
    })

    it('should throw NotFoundException when appointment is not found', async () => {
      jest.spyOn(appService, 'getAppointmentById').mockResolvedValue(null);

      try {
        await appService.getAppointmentById(1, 1);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Information about appointment is not found');
      }
    });
  })
});
