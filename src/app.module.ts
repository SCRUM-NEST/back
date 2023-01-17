import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv';
import { UserEntity } from './user/entities/user.entity/user.entity';
import { ConfigModule } from '@nestjs/config';

dotenv.config();
@Module({
  imports: [UserModule,
            ConfigModule.forRoot({isGlobal:true}),
            TypeOrmModule.forRoot({
              type: 'mysql' ,
              host: process.env.DB_HOST ,
              port:parseInt(process.env.DB_PORT) ,
              username: process.env.DB_USERNAME,
              password: process.env.DB_PASSWORD,
              database: process.env.DB_NAME,
              entities:[UserEntity],
              synchronize: true
            })
            ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
