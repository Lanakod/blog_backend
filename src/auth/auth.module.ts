import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '@app/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtConfigAsync } from '@config/jwt.config';
import { TwoFactorService } from '@auth/services/two-factor.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, TwoFactorService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.registerAsync(JwtConfigAsync),
  ],
  exports: [AuthService, JwtModule, TwoFactorService],
})
export class AuthModule {}
