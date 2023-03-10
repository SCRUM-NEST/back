import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import * as dotenv from 'dotenv';
import { JwtStrategy } from './strategy/passport-jwt.startegy';

dotenv.config();
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),
  PassportModule.register({
    defaultStrategy: 'jwt'
  }),
  JwtModule.register(
    {
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: 3600
      }
    }
  )],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [JwtModule.register(
    {
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: 3600
      }
    }
  )]
})
export class UserModule { }
