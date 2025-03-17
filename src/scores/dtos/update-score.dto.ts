import { IsNumber, IsOptional} from 'class-validator';

export class UpdateScoreDto {
    @IsNumber()
    score: number;
}
