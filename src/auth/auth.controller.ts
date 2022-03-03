import { Controller, Post, Req, UseGuards, Logger } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/user/entity/user.entity';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {

    private logger = new Logger('AuthController')

    constructor(
        private readonly authService: AuthService
    ){}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Req() req: Request): { access_token: string} {

        this.logger.verbose(`The user ${req.body.email} has been logged`)
        return this.authService.login(req.user as User)
    }
}
