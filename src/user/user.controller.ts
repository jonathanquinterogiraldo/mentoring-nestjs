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
import { UseGuards, Logger, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';

@Controller('user')
export class UserController {
    
    private logger = new Logger('UserController')
   
    constructor(private userService: UserService){}

    @Get('/')
    @UseGuards(JwtAuthGuard)    
    async getUsers(@Req() req, @Res() res): Promise<User[]>{

        const users = await this.userService.getUsers()

        if (users){
            this.logger.verbose(`Get request ('/') User ${req.user.email} retrieving all users`)
            return res.status(HttpStatus.OK).json({
            message: 'All users!',
            users
         })
        } else {
            res.status(HttpStatus.OK).json({
            message: 'There are not user!'
            })
        }
    }

    @Get('/:id')
    @UseGuards(JwtAuthGuard)    
    async getUser(@Req() req, @Res() res, @Param('id', ParseIntPipe) id: number): Promise<User>{ 

        const user =  await this.userService.getUser(id);
        if (!user){
            throw new NotFoundException('This user does not exist!')
        }
        this.logger.verbose(`Get request ('/${id}') User ${req.user.email} retrieving one especific user`)
        return res.status(HttpStatus.OK).json(user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/create')
     async createUser(@Req() req, @Res() res, @Body() createUserDto: CreateUserDTO): Promise<Response>{         
        
        const { email } = createUserDto;        
        
        const userExist = await this.userService.getUserByEmail(email)  

        if (!userExist){
            
            const user = await this.userService.createUser(createUserDto);
            this.logger.verbose(`Post request ('/create') User ${req.user.email} creating a user`)
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

        
    }
     
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Put('/update')
     async updateUser(@Req() req, @Res() res, @Body() createUserDto: CreateUserDTO, @Query('id') id): Promise<User>{

        const updatedUser = await this.userService.updateUser(id, createUserDto);           
        if (!updatedUser){
            throw new NotFoundException('This user does not exist')
        }
        this.logger.verbose(`Put request ('/update') User ${req.user.email} updating a user`)
        return res.status(HttpStatus.OK).json({
            message: 'User updated succefully',
            updatedUser
        });

    }

   @UseGuards(JwtAuthGuard, RoleGuard)
   @Delete('/delete')
    async deleteUser(@Req() req, @Res() res, @Query('id') id): Promise<User>{

        const deletedUser =  await this.userService.deleteUser(id);
        if (!deletedUser){
            throw new NotFoundException('This user does not exist')
        }
        this.logger.verbose(`Delete request ('/delete') User ${req.user.email} deleting a user`)
        return res.status(HttpStatus.OK).json({
            message: 'User deleted succefully!',
            deletedUser
        });
    }    
}
