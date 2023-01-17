import { Status } from 'src/enums/status.enum';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateOrderDto {

    @IsOptional()
    @IsString()
    description: string 

    @IsOptional()
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
    status: string 
  }