import { IsEmail, IsNotEmpty } from "class-validator";
import { UserRoleEnum } from "src/enums/user.role.enum";

export class RegisterUserDto {
    @IsNotEmpty()
    firstName: string;
    @IsNotEmpty()
    lastName: string;
    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    password: string;
    @IsNotEmpty()
    role: string;
}