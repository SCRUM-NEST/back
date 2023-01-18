import { IsEmail, IsNotEmpty } from "class-validator";
import { UserRoleEnum } from "src/enums/user.role.enum";

export class SubscribeUserDto{
    
    @IsNotEmpty()
    username:string;
    @IsNotEmpty()
    @IsEmail()
    email:string;
    @IsNotEmpty()
    password:string;
    @IsNotEmpty()
    role:UserRoleEnum;
}