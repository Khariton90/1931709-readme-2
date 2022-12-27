import { ConfigModule, ConfigService } from '@nestjs/config';
import { BlogUserModule } from './../blog-user/blog-user.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from '../config/jwt.config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    BlogUserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory:  getJwtConfig
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
