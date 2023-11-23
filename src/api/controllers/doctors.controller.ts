import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { DoctorsService } from '../services/doctors.service';
import { DoctorByIdPipe } from '../pipes/DoctorByIdPipe';

@Controller('doctors')
export class DoctorsController {
  constructor (
    private doctorService: DoctorsService,
  ) {}

  @Get()
  async getDoctors () {
    return this.doctorService.getDoctors();
  }

  @Get('/:doctorId')
  async getDoctor (
    @Param('doctorId', ParseIntPipe, DoctorByIdPipe) doctorId: number,
  ) {
    return this.doctorService.getDoctor(doctorId);
  }
}
