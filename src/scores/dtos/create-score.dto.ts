import { IsNumber, IsString } from 'class-validator';

export class CreateScoreDto {
    @IsString()
    quiz_id: string;

    @IsString()
    user_id: string;

    @IsNumber()
    score: number;
};
