import { Status } from 'src/enum/status.enum';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class AddOrderDto {

    @IsNotEmpty()
    @IsString()
    description: string 

    @IsNotEmpty()
    @Type(()=>Number)
    @IsNumber()
    budget: string  

    @IsOptional()
    image: string //for now because it will be an image api

    @IsOptional()
    @Type(()=>Number)
    @IsNumber()
    cost: string  

    @IsOptional()
    @IsString()
    meeting_date: string // check if it's a date ?

    @IsOptional()
    @IsString()
    meeting_link: string

    @IsOptional()
    @IsEnum(Status)
    status: Status
  }