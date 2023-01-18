import { Status } from 'src/enums/status.enum';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class AddOrderDto {

  @IsNotEmpty()
  @IsString()
  description: string


  @IsOptional()
  @IsNumber()
  cost: string


  @IsOptional()
  @IsEnum(Status)
  status: Status

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  tailorId: number;
}