import { Injectable } from '@nestjs/common';
import {DoctorsRepository} from './database/repositories/DoctorsRepository';

@Injectable()
export class AppService {
  constructor(private doctorsRepository: DoctorsRepository) {}

  async getDoctors() {
    return this.doctorsRepository.getDoctors();
  }
}
