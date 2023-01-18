import { IsOptional } from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    firstName : string;
    @IsOptional()
    lastName : string;
    @IsOptional()
    username : string;
    @IsOptional()
    email: string ;
    @IsOptional()
    password : string;
    @IsOptional()
    role: string ; 



}