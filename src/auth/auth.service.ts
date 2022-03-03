import { Injectable, ParseUUIDPipe } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entity/user.entity';
import * as bcrypt from 'bcrypt'
require('dotenv').config()

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ){}

    async validate(email: string, password: string): Promise<User | null> {

        try {

            const user = await this.userService.getUserByEmail(email)

            if (!user){
                return null
            }

            const passwordIsValid = await bcrypt.compare(password, user.password)
            return passwordIsValid ? user : null

        } catch (error) {

            throw new Error(error)
        }
    }

    login(user: User): { access_token: string } {
        const payload = {
            email: user.email,
            sub: user.id,
        }

        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async verify(token: string): Promise<User> {
        const decoded = this.jwtService.verify(token, {
            secret: process.env.JWT_SECRET
        })

        const user = await this.userService.getUserByEmail(decoded.email)

        if(!user){

            throw new Error('Unable to get the user from decoded token')
        }

        return user

    }
    
}
