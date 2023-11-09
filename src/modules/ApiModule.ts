import { Module } from '@nestjs/common';
import { DoctorsModule } from './doctors.module';
import { AuthModule } from './auth.module';
import { ReviewsModule } from './reviews.module';
import { AppointmentsModule } from './appointments.module';
import { ClientsModule } from './clients.module';

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