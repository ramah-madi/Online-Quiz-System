import { IsString, IsBoolean } from 'class-validator';

export class UpdateOptionDto {
    @IsString()
    option_text: string;

    @IsBoolean()
    is_correct: boolean;
}