import {Global, Module} from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DoctorsRepository } from './repositories/DoctorsRepository';

@Global()
@Module({
  providers: [DatabaseService, DoctorsRepository],
  exports: [DatabaseService, DoctorsRepository]
})
export class DatabaseModule {}
