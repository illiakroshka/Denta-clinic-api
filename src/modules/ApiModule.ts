import { Module } from '@nestjs/common';
import { DoctorsModule } from '../doctors/doctors.module';
import { AuthModule } from '../auth/auth.module';
import { ReviewsModule } from '../reviews/reviews.module';
import { AppointmentsModule } from '../appointments/appointments.module';
import { ClientsModule } from '../clients/clients.module';

@Module({
  imports: [
    AuthModule,
    DoctorsModule,
    ReviewsModule,
    AppointmentsModule,
    ClientsModule,
  ],
})

export class ApiModule {}