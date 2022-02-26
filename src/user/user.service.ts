import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDTO } from './dto/user.dto';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userModel: Repository<User>){}

    async getUsers(): Promise<User[]>{

        const users =  await this.userModel.find();
        return users;
     }

    async getUser(id: string): Promise<User>{

         const user = await this.userModel.findOne(id);
         return user;
     }

     async createUser(createUserDTO: CreateUserDTO): Promise<User>{

         const newUser = await this.userModel.create(createUserDTO);        
         return await this.userModel.save(newUser);        
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
