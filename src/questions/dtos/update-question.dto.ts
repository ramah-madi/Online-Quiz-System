import { IsString, IsEnum, IsOptional } from 'class-validator';

export class UpdateQuestionDto {
    @IsString()
    question_text: string;

    @IsOptional()
    @IsEnum(['multiple_choice', 'true_false'])
    question_type?: 'multiple_choice' | 'true_false';
}
