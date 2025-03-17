import { Controller, Post, Body, Session, Request, Response, UseInterceptors } from '@nestjs/common';
import { UserDto } from '../users/dtos/user.dto';
import { AuthService } from './auth.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateUserDto } from './dtos/create-user.dto';
import { SigninUserDto } from './dtos/signin-user.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('auth')
@Serialize(UserDto)
export class AuthController {
    constructor(private authService: AuthService) {};

    @Public()
    @Post('/signup')
    async create(@Body() body: CreateUserDto) {
        const user = await this.authService.signup(body.email, body.password, body.username);
        return user;
    };

    @Public()
    @Post('/signin')
    async signin(@Body() body: SigninUserDto) {
        const user = await this.authService.signin(body.email, body.password);
        return user;
    };

    @Post('/signout')
    signOut(@Request() req: any, @Response() res: any) {
        req.user = null;
        res.setHeader('Authorization', '');
        return res.status(200).json({ message: 'Successfully logged out' });
    };
}
