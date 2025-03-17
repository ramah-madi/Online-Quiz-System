import { Expose } from 'class-transformer';

export class UserDto {
    @Expose()
    id: string;

    @Expose()
    username: string;

    @Expose()
    email: string;

    password: string;

    @Expose()
    created_at: Date;

    @Expose()
    created_by: string;

    @Expose()
    updated_by: string;

    @Expose()
    updated_at: Date;
}