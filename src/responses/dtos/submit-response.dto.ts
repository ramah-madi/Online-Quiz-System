import { IsString } from 'class-validator';

export class SubmitResponseDto {
    @IsString()
    quiz_id: string;

    @IsString()
    selected_option_id: string;

    @IsString()
    question_id: string;
}
