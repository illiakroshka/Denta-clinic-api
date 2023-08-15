import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import {DatabaseModule} from "./database/database.module";
import { NotFoundException } from '@nestjs/common';
import { doctorStub } from "./stubs/doctor.stub";
import { appointmentStub } from "./stubs/appointment.stub";

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
      jest.spyOn(appService, 'getDoctorById').mockResolvedValue(doctorStub());
      const result = await appService.getDoctorById(1);
      expect(result).toEqual(doctorStub());
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
      jest.spyOn(appService, 'getAppointmentById').mockResolvedValue(appointmentStub());

      const result = await appService.getAppointmentById(1,1);

      expect(result).toEqual(appointmentStub());
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
