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
    Query 
} from '@nestjs/common';
import { User } from './interfaces/user.interace';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/user.dto';

@Controller('user')
export class UserController {
   
    constructor(private userService: UserService){}

    @Get('/')
    async getUsers(@Res() res): Promise<User[]>{

        const users = await this.userService.getUsers()
        return res.status(HttpStatus.OK).json({
            message: 'All users!',
            users
        })
    }

    @Get('/:id')
    async getUser(@Res() res, @Param('id') id: string): Promise<User>{ 

        const user =  await this.userService.getUser(id);
        if (!user){
            throw new NotFoundException('This user does not exist!')
        }
        return res.status(HttpStatus.OK).json(user);
    }

     @Post('/create')
     async createUser(@Res() res, @Body() createUserDto: CreateUserDTO): Promise<User>{         
         
        const user = await this.userService.createUser(createUserDto);    
        return res.status(HttpStatus.OK).json({
            message: 'User created!',
            user
        })
    }   

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
