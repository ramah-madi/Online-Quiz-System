import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateQuizDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;
}