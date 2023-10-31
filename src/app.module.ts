import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { MapperModule } from './modules/MapperModule';

@Module({
  imports: [DatabaseModule, AuthModule, MapperModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
