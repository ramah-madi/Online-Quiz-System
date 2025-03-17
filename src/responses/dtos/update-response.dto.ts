import { IsOptional, IsString } from 'class-validator';

export class UpdateResponseDto {
    @IsString()
    @IsOptional()
    quiz_id: string;

    @IsString()
    @IsOptional()
    selected_option_id: string;

    @IsString()
    @IsOptional()
    question_id: string;
}
