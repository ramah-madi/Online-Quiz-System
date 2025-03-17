import { Controller, Post, Body, Request, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { SigninUserDto } from './dtos/signin-user.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {};

    @Public()
    @Post('/signup')
    async create(@Body() body: CreateUserDto, @Response() res: any) {
        const { user, accessToken } = await this.authService.signup(body.email, body.password, body.username);
        res.setHeader('Authorization', `Bearer ${accessToken}`);

        return res.status(200).json(user);
    };

    @Public()
    @Post('/signin')
    async signin(@Body() body: SigninUserDto, @Response() res: any) {
        const { user, accessToken } = await this.authService.signin(body.email, body.password);
        res.setHeader('Authorization', `Bearer ${accessToken}`);

        return res.status(200).json(user);
    };

    @Post('/signout')
    signOut(@Request() req: any, @Response() res: any) {
        req.user = null;
        res.setHeader('Authorization', '');
        return res.status(200).json({ message: 'Successfully logged out' });
    };
}
