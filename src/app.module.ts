import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { MapperModule } from './modules/MapperModule';
import { ReviewsModule } from './reviews/reviews.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [DatabaseModule, AuthModule, MapperModule, ReviewsModule, AppointmentsModule, ClientsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
