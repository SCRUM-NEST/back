import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { addUserDto } from './dto/addUser.dto';
import { LoginCredentialsDto } from './dto/loginCredentials.dto';
import { SubscribeUserDto } from './dto/subscribe.user.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserEntity } from './entities/user.entity/user.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
 constructor(
    private userService : UserService 
 )
 { }


 @Get('/getAllUsers')
 @UseGuards(JwtAuthGuard)
 async getAllUsers(): Promise<UserEntity[]> {
   return await this.userService.getAllUsers();    
 }

 @Get('recover/:id')
 async restoreUser(@Param('id',ParseIntPipe)id:number)
 {return await this.userService.restoreUser(id);}

 @Post('/addUser')
async addUser(@Body() user:addUserDto ) : Promise<UserEntity>
{return await this.userService.addUser(user); 
} 

@Patch('/updateUser/:id')
async upateUser(@Param('id',ParseIntPipe)id , number ,@Body()user: UpdateUserDto):Promise<UserEntity>{
    return await this.userService.updateUser(id,user);
}

@Delete('deleteUser/:id')
async deleteUser(@Param('id',ParseIntPipe)id:number)
{return await this.userService.softDeleteUser(id);}

@Post('/register')
async registerUser(@Body()userData:SubscribeUserDto):Promise<Partial<UserEntity>>
{return this.userService.register(userData);}

@Post('/login')
async login(@Body()credentials:LoginCredentialsDto)
{return this.userService.login(credentials);}






}
