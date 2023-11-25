import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { DoctorsRepository } from '../../database/repositories/DoctorsRepository';

@Injectable()
export class DoctorByIdPipe implements PipeTransform {
  constructor (
    private doctorRepository: DoctorsRepository
  ) {}
  async transform (doctorId: number) {
    const doctor = await this.doctorRepository.findById(doctorId);
    if (!doctor) {
      throw new NotFoundException('Doctor with such id is not found');
    }
    return doctorId;
  }
}