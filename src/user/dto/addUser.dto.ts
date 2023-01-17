import { IsNotEmpty } from "class-validator";

export class addUserDto {
    
    @IsNotEmpty()
    username : string;
    @IsNotEmpty()
    age:number;
    @IsNotEmpty()
    email: string ;
    @IsNotEmpty()
    password : string;
    @IsNotEmpty() 
    creditCardNumber: number ; 
    @IsNotEmpty()
    cin:number;
    @IsNotEmpty()
    role: string ; 
}