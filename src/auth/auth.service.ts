import { Injectable, BadRequestException, NotFoundException, Res } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';


const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
                private jwtService: JwtService) {};

    async signup(email: string, password: string, username: string) {
        // See if email is in use
        const users = await this.usersService.findByEmail(email);

        if (users.length) {
            throw new BadRequestException('email in use');
        };

        // Hash the user's password
        // Generate a salt
        const salt = randomBytes(8).toString('hex');

        // Hash the salt and the password together
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        // Join the hashed result andthe salt together
        const result = salt + '.' + hash.toString('hex');

        // Create a new user and save it
        const user = await this.usersService.create(email, result, username);

        const payload = { sub: user.id, role: user.role };

        await this.jwtService.signAsync(payload);

        return user;
    };

    async signin(email: string, password: string) {
        const [user] = await this.usersService.findByEmail(email);
        if (!user) {
            throw new NotFoundException('user not found');
        };

        const [salt, storedHash] = user.password.split('.');

        const hash = (await scrypt(password, salt, 32)) as Buffer;

        if (storedHash !== hash.toString('hex')) {
            throw new BadRequestException('bad password');
        };

        const payload = { sub: user.id, role: user.role };
        const accessToken = await this.jwtService.signAsync(payload);

        return accessToken;
    };

}
