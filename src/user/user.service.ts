import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt'


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private userModel: Repository<User>
        ){}

    async getUsers(): Promise<User[]>{

        return await this.userModel.find();
    }

    async getUser(id: string): Promise<User>{

        return await this.userModel.findOne(id);    
     }

     async getUserByEmail(email: string): Promise<User | undefined> {

        return await this.userModel.findOne({ email });
     }

     async createUser(createUserDTO: CreateUserDTO): Promise<User>{   

        const { password, ...restData } = createUserDTO        
        
            try {

                const salt = await bcrypt.genSalt();
                const encriptedPassword = await bcrypt.hash(password, salt);   
                const newUser = {...restData, password: encriptedPassword };
                    
                return await this.userModel.save(newUser);

            } catch (error) {
                throw new Error(error)                
            }
     }

     async updateUser(id: number, createUserDTO: CreateUserDTO){

        const updatedUser = await this.userModel.findOne(id);
        this.userModel.merge(updatedUser, createUserDTO)       
        return this.userModel.save(updatedUser);        
    }

    async deleteUser(id: number){
        const deletedUser = await this.userModel.delete(id);        
        return deletedUser;        
    }
}
