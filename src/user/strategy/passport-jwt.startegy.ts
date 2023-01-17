import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import *as dotenv from 'dotenv';
import { PayloadInterface } from '../interfaces/payload.interface';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

dotenv.config();
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
            @InjectRepository(UserEntity)
              private userRepository: Repository<UserEntity>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET
    });
  }

  async validate(payload: PayloadInterface) {
  
    const user= await this.userRepository.createQueryBuilder("user")
         .where("user.username= :username or user.email= :username")
         .setParameters({username: payload.username})
         .getOne();
         console.log(user);

    if (user)
    {const {password, salt, ...result }=user;
     return result;}
    else
    {
        throw new UnauthorizedException();
    } 

  }
}