import { Module } from '@nestjs/common';
import { AuthController } from '../api/controllers/auth.controller';
import { AuthService } from '../api/services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../security/auth.guard';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'anyway',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthService],
})
export class AuthModule {}
