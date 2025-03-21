import {IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    username: string;

    @IsString()
    role: string;
}