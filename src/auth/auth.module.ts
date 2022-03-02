import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
require('dotenv').config()

@Module({
  imports:[TypeOrmModule.forFeature([User]), UserModule,
  PassportModule.register({ defaultStrategy: 'jwt'}),
  JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn:'3600s'}
    })
  ],
  
  providers: [AuthService, JwtStrategy, LocalStrategy],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
