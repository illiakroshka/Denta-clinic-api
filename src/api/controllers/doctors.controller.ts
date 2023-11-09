import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { DoctorsService } from '../services/doctors.service';

@Controller('doctors')
export class DoctorsController {
  constructor(
    private doctorService: DoctorsService,
  ) {}

  @Get()
  async getDoctors() {
    return this.doctorService.getDoctors();
  }

  @Get('/:doctorId')
  async getDoctor(
    @Param('doctorId', ParseIntPipe) doctorId: number,
  ) {
    return this.doctorService.getDoctor(doctorId);
  }
}
