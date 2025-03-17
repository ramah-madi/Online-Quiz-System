import { Expose, Transform  } from 'class-transformer';

export class OptionDto {
    @Expose()
    id: string;

    @Expose()
    option_text: string;

    @Expose()
    is_correct: boolean;

    @Expose()
    question_id: string;

    @Expose()
    created_at: Date;

    @Expose()
    created_by: string;

    @Expose()
    updated_by: string;

    @Expose()
    updated_at: Date;
}