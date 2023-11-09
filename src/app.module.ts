import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { MapperModule } from './modules/MapperModule';
import { ApiModule } from './modules/ApiModule';

@Module({
  imports: [ApiModule, DatabaseModule, MapperModule],
})
export class AppModule {}
