import { 
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Res,
    HttpStatus,
    Body,
    Param,
    NotFoundException,
    Query, 
    ParseIntPipe
} from '@nestjs/common';
import { User } from './interfaces/user.interace';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/user.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
   
    constructor(private userService: UserService){}

    @UseGuards(JwtAuthGuard)
    @Get('/')
    async getUsers(@Res() res): Promise<User[]>{

        const users = await this.userService.getUsers()
        return res.status(HttpStatus.OK).json({
            message: 'All users!',
            users
        })
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    async getUser(@Res() res, @Param('id', ParseIntPipe) id: number): Promise<User>{ 

        const user =  await this.userService.getUser(id);
        if (!user){
            throw new NotFoundException('This user does not exist!')
        }
        return res.status(HttpStatus.OK).json(user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/create')
     async createUser(@Res() res, @Body() createUserDto: CreateUserDTO): Promise<Response>{         
        
        const { email } = createUserDto;        
        
        const userExist = await this.userService.getUserByEmail(email)  

        try {

            if (!userExist){
                
                const user = await this.userService.createUser(createUserDto);
                return res.status(HttpStatus.OK).json({
                        message: 'User created!',
                        user
                    })
            }
            else {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: 'User already exist!'
                })
            }

        } catch (error) {
            throw new Error(error)

        }
               
        
        
    }
     
    @UseGuards(JwtAuthGuard)
    @Put('/update')
     async updateUser(@Res() res, @Body() createUserDto: CreateUserDTO, @Query('id') id): Promise<User>{

        const updatedUser = await this.userService.updateUser(id, createUserDto);           
        if (!updatedUser){
            throw new NotFoundException('This user does not exist')
        }
        return res.status(HttpStatus.OK).json({
            message: 'User updated succefully',
            updatedUser
        });

    }

   @UseGuards(JwtAuthGuard)
   @Delete('/delete')
    async deleteUser(@Res() res, @Query('id') id): Promise<User>{

        const deletedUser =  await this.userService.deleteUser(id);
        if (!deletedUser){
            throw new NotFoundException('This user does not exist')
        }
        return res.status(HttpStatus.OK).json({
            message: 'User deleted succefully!',
            deletedUser
        });
    }    
}
