import { Expose, Transform  } from 'class-transformer';

export class QuestionDto {
    @Expose()
    id: string;

    @Expose()
    question_text: string;

    @Expose()
    question_type: string;

    @Expose()
    quiz_id: string;

    @Expose()
    created_at: Date;

    @Expose()
    created_by: string;

    @Expose()
    updated_by: string;

    @Expose()
    updated_at: Date;
}