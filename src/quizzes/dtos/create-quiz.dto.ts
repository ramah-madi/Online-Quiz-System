import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateQuizDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description: string;
}