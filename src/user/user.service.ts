import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { addUserDto } from './dto/addUser.dto';
import { RegisterUserDto } from './dto/registerUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserEntity } from './entities/user.entity/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginCredentialsDto } from './dto/loginCredentials.dto';
import { JwtService } from '@nestjs/jwt/dist';
import { UserRoleEnum } from 'src/enums/user.role.enum';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private jwtService: JwtService
    ) { }

    async getAllUsers(): Promise<UserEntity[]> {
        return await this.userRepository.find();
    }

    async getUserById(id: number): Promise<UserEntity> { return await this.userRepository.findOneById(id); }

    async addUser(user: addUserDto): Promise<UserEntity> {
        return await this.userRepository.save(user);
    }

    async updateUser(id: number, user: UpdateUserDto): Promise<UserEntity> {
        const newUser = await this.userRepository.preload({
            id,
            ...user
        });

        if (!newUser)
            throw new NotFoundException(`The user with the id ${id} n'existe pas `);

        return await this.userRepository.save(newUser);
    }

    async softDeleteUser(id: number) {
        return await this.userRepository.softDelete(id);
    }

    async restoreUser(id: number) {
        return await this.userRepository.restore(id);
    }



    async getListOfTailors(role: UserRoleEnum): Promise<UserEntity[]> {
        const tailors = await this.userRepository.createQueryBuilder("user")
            .where("user.role= :role")
            .setParameters({ role })
            .getMany();
        return tailors;
    }


    async register(userData: RegisterUserDto): Promise<Partial<UserEntity>> {
        const user = this.userRepository.create({
            ...userData
        });
        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, user.salt);
        try {
            await this.userRepository.save(user);
        }
        catch (e) { throw new ConflictException('le username et l\'email doivent être uniques '); }

        return {
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password,
            role: user.role
        };
    }


    async login(credentials: LoginCredentialsDto) {

        const { username, password } = credentials;
        const user = await this.userRepository.createQueryBuilder("user")
            .where("user.username= :username or user.email= :username")
            .setParameters({ username })
            .getOne();

        if (!user)
            throw new NotFoundException('bad credentials');
        const hashedPassword = await bcrypt.hash(password, user.salt);
        if (hashedPassword === user.password) {
            const payload = {
                username: user.username,
                email: user.email,
                role: user.role
            };
            const jwt = await this.jwtService.sign(payload);
            return {
                "access_token": jwt,
                "user": user
            };
        }
        else
            throw new NotFoundException('bad credentials');




    }

}