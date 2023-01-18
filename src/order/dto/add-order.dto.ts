import { Status } from 'src/enums/status.enum';
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
    @Type(()=>Number)
    @IsNumber()
    cost: string  

    @IsOptional()
    @IsString()
    meeting_date: string

    @IsOptional()
    @IsString()
    meeting_link: string

    @IsOptional()
    @IsEnum(Status)
    status: Status
    
    @IsNotEmpty()
    userId:number;

    @IsNotEmpty()
    tailorId:number;
  }