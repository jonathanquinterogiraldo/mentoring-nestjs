import { Controller, Post, Req, UseGuards, Logger } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/user/entity/user.entity';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {    

    constructor(
        private readonly authService: AuthService,
        private readonly logger: Logger
    ){}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Req() req: Request): { access_token: string} {
        this.logger.log(
            `The user ${req.body.email} has been logged`,
            AuthService.name);

        return this.authService.login(req.user as User)
    }
}
