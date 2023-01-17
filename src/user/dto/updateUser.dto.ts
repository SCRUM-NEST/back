import { IsOptional } from "class-validator";

export class UpdateUserDto

{   @IsOptional()
    username : string;
    @IsOptional()
    age:number;
    @IsOptional()
    email: string ;
    @IsOptional()
    password : string;
    @IsOptional()
    creditCardNumber: number ; 
    @IsOptional()
    cin:number;
    @IsOptional()
    role: string ; 




}