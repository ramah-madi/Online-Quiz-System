import { IsString, IsEnum, IsOptional } from 'class-validator';

export class CreateQuestionDto {
    @IsString()
    question_text: string;

    @IsEnum(['multiple_choice', 'true_false'])
    @IsOptional()
    question_type?: 'multiple_choice' | 'true_false';

    @IsString()
    quiz_id: string;
}
