import { Expose  } from 'class-transformer';

export class QuizDto {
    @Expose()
    id: string;

    @Expose()
    title: string;

    @Expose()
    description: string;

    @Expose()
    created_at: Date;

    @Expose()
    created_by: string;

    @Expose()
    updated_by: string;

    @Expose()
    updated_at: Date;
}